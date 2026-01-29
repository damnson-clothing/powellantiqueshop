import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-serif font-bold text-gray-900"> Powell&#39;s Admin Panel </h2><p class="mt-2 text-center text-sm text-gray-600"> Sign in to manage your store </p></div><form class="mt-8 space-y-6">`);
      if (unref(errorMessage)) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="rounded-md shadow-sm space-y-4"><div><label for="username" class="block text-sm font-medium text-gray-700 mb-1"> Username </label><input id="username"${ssrRenderAttr("value", unref(username))} name="username" type="text" required class="input" placeholder="Enter username"></div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-1"> Password </label><input id="password"${ssrRenderAttr("value", unref(password))} name="password" type="password" required class="input" placeholder="Enter password"></div></div><div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full btn btn-primary py-3 text-lg">`);
      if (unref(loading)) {
        _push(`<span>Signing in...</span>`);
      } else {
        _push(`<span>Sign In</span>`);
      }
      _push(`</button></div><div class="bg-yellow-50 border border-yellow-200 rounded p-4"><p class="text-xs text-yellow-800"><strong>Default credentials:</strong><br> Username: admin<br> Password: admin123 </p></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DKjwnYq9.mjs.map
