//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CGU3oTdK.js
var manifest = {
	"15800936c196ae116e4337c805eacb2391492c42dfb93ec61d30fe429beb7c78": {
		functionName: "translateToHiragana_createServerFn_handler",
		importer: () => import("./_ssr/translate.functions-CALQdvz2.mjs")
	},
	"c31230cc85529b826003c06f9c956713d062fae19193f0be4297d370bc527d91": {
		functionName: "translateFromHiragana_createServerFn_handler",
		importer: () => import("./_ssr/translate.functions-CALQdvz2.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
