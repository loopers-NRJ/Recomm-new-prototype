import withAdminsAuthentication from "./middleware/admin";
import withUserAuthentication from "./middleware/auth";
import { stackMiddlewares } from "./middleware/stackMiddlewares";

const middlewares = [withUserAuthentication, withAdminsAuthentication];

export default stackMiddlewares(middlewares);
