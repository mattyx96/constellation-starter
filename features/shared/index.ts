import * as Adapters from './adapters/defaultAdapter';
import { Singleton } from './decorators/Singleton';
import { useZustandStoreSelector } from './selectors/react/useZustandStoreSelector';

// types
//...

// adapters
export { Adapters };

// decorator
export { Singleton };

// selectors
export { useZustandStoreSelector as useReactFeatureStore };
