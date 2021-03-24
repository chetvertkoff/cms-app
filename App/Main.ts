import DBConnect from './application/helper/DBConnect';
import Server from './application/Server';

(async function (): Promise<void>  {
  await new DBConnect().initConnect()
  await Server.runServer()
}())