import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = ref({
      totalOrders: 0,
      totalProducts: 0,
      totalRevenue: 0,
      pendingOrders: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-serif font-bold mb-6">Dashboard</h1><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></div><div class="ml-5"><h3 class="text-gray-500 text-sm font-medium">Total Orders</h3><p class="text-3xl font-bold text-gray-900 mt-2">${ssrInterpolate(unref(stats).totalOrders)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div><div class="ml-5"><h3 class="text-gray-500 text-sm font-medium">Total Products</h3><p class="text-3xl font-bold text-gray-900 mt-2">${ssrInterpolate(unref(stats).totalProducts)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-5"><h3 class="text-gray-500 text-sm font-medium">Revenue</h3><p class="text-3xl font-bold text-gray-900 mt-2">$${ssrInterpolate(unref(stats).totalRevenue.toFixed(2))}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="flex-shrink-0"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-5"><h3 class="text-gray-500 text-sm font-medium">Pending Orders</h3><p class="text-3xl font-bold text-gray-900 mt-2">${ssrInterpolate(unref(stats).pendingOrders)}</p></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-primary-400 hover:shadow-md transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><div class="flex-1 min-w-0"${_scopeId}><span class="absolute inset-0" aria-hidden="true"${_scopeId}></span><p class="text-lg font-medium text-gray-900"${_scopeId}>Manage Products</p><p class="text-sm text-gray-500"${_scopeId}>Add, edit, or remove products from inventory</p></div><div class="flex-shrink-0"${_scopeId}><svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-10 w-10 text-primary-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    })
                  ]))
                ]),
                createVNode("div", { class: "flex-1 min-w-0" }, [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  }),
                  createVNode("p", { class: "text-lg font-medium text-gray-900" }, "Manage Products"),
                  createVNode("p", { class: "text-sm text-gray-500" }, "Add, edit, or remove products from inventory")
                ]),
                createVNode("div", { class: "flex-shrink-0" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5 text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/orders",
        class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-primary-400 hover:shadow-md transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><div class="flex-1 min-w-0"${_scopeId}><span class="absolute inset-0" aria-hidden="true"${_scopeId}></span><p class="text-lg font-medium text-gray-900"${_scopeId}>Manage Orders</p><p class="text-sm text-gray-500"${_scopeId}>View and process customer orders</p></div><div class="flex-shrink-0"${_scopeId}><svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-10 w-10 text-primary-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ]))
                ]),
                createVNode("div", { class: "flex-1 min-w-0" }, [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  }),
                  createVNode("p", { class: "text-lg font-medium text-gray-900" }, "Manage Orders"),
                  createVNode("p", { class: "text-sm text-gray-500" }, "View and process customer orders")
                ]),
                createVNode("div", { class: "flex-shrink-0" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5 text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-lg shadow p-6"><h2 class="text-xl font-bold mb-4">Welcome to Powell&#39;s Admin Panel</h2><p class="text-gray-600 mb-4"> Use the sidebar to navigate through different sections: </p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Products:</strong> Manage your product catalog</li><li><strong>Orders:</strong> View and process customer orders</li><li><strong>Categories:</strong> Organize your products</li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DOKHETRr.mjs.map
