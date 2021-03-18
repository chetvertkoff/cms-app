import DBConnect from './infrastructure/helper/DBConnect';
import Server from './application/Server';

const initApp = async (): Promise<void> => {  
  await new DBConnect().initConnect()
  await Server.runServer()
}

initApp();