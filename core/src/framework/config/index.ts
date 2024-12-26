import { IDependencies } from "./IDependencies";
import { DependencyContainer } from "./DependencyContainer";

type Command = {
  dependencies: IDependencies;
};

export const initCore = (command: Command) => {
  /*init dependency container*/
  const container = new DependencyContainer();
  container.setDependencies(command.dependencies);
  container.resolve("toastService").createSuccessToaster("test");
};
