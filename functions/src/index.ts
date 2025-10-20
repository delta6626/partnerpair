import { setGlobalOptions } from "firebase-functions";
import { UserTier } from "../../shared/types/UserTier";
import { onCall } from "firebase-functions/https";

setGlobalOptions({ maxInstances: 10 });
