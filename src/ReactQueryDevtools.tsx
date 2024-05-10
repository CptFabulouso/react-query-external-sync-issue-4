import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, memo, useEffect, useMemo } from 'react';
import { useAllQueries } from 'react-query-external-sync';

export type ReactQueryDevtoolsProps = {
  onDevtoolsConnected?: () => void;
  queryClient: ReturnType<typeof useQueryClient>;
  socketURL: string;
  children?: (data: { devtoolsConnected: boolean }) => ReactNode;
};

const ReactQueryDevtools = ({
  children,
  queryClient,
  onDevtoolsConnected,
  socketURL,
}: ReactQueryDevtoolsProps) => {
  const queryData = useMemo(
    () => ({
      queryClient,
      query: {
        username: 'App',
        userType: 'User',
        clientType: 'client' as const,
      },
      socketURL: socketURL,
    }),
    [queryClient, socketURL],
  );

  const { connect, disconnect, isConnected } = useAllQueries(queryData);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    onDevtoolsConnected?.();
    // eslint-disable-next-line no-console
    __DEV__ && console.log('React Query remote devtools connected');
  }, [isConnected, onDevtoolsConnected]);

  return useMemo(
    () => (children ? children({ devtoolsConnected: isConnected }) : null),
    [isConnected, children],
  );
};

const ReactQueryDevtoolsProduction = ({
  children,
}: ReactQueryDevtoolsProps) => {
  return useMemo(
    () => (children ? children({ devtoolsConnected: true }) : null),
    [children],
  );
};

export default memo(
  __DEV__ ? ReactQueryDevtools : ReactQueryDevtoolsProduction,
);
