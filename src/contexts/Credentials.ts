import { createContext, useContext } from 'react';
import { Credentials } from '../models/Credentials';

export const CredentialsContext = createContext<Credentials | undefined>(undefined);

export const useCredentials = () => useContext(CredentialsContext);
