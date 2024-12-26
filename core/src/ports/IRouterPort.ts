export interface IRouterPort {
  navigate: (path: string, replace?: boolean) => Promise<void>;
  reload: () => void;
}
