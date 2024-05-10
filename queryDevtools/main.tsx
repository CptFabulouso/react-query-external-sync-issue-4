import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExternalDevTools, socketHandle } from 'react-query-external-dash';

if (typeof window !== 'undefined') {
  // @ts-ignore
  const socketUrl = window.SOCKET_URL;
  if (socketUrl) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <ExternalDevTools
          socketURL={socketUrl}
          query={{
            clientType: 'server',
            username: 'Admin',
            userType: 'admin',
          }}
        />
      </React.StrictMode>,
    );
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'REACT_DEVTOOLS_SOCKET_URL is not defined in .env.local file',
    );
  }
} else {
  import('socket.io').then((socketIO) => {
    const io = new socketIO.Server(3000, {
      cors: {
        origin: '*',
      },
    });

    socketHandle({ io });

    io.on('connection', (client) => {
      // eslint-disable-next-line no-console
      console.log(`'${client.handshake.query.username}' connected`);
    });
  });
}
