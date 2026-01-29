import { _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const deleteProduct = async (productId) => {
      if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
        return;
      }
      try {
        await $fetch(`/api/admin/products/${productId}`, {
          method: "DELETE"
        });
        products.value = products.value.filter((p) => p.id !== productId);
        alert("Product deleted successfully");
      } catch (err) {
        alert(err.message || "Failed to delete product");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"${_scopeId}><div class="flex justify-between items-center mb-8"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Products</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Manage your product inventory</p></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/products/create",
              class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg> Add Product `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "-ml-1 mr-2 h-5 w-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 4v16m8-8H4"
                      })
                    ])),
                    createTextVNode(" Add Product ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(loading)) {
              _push2(`<div class="text-center py-12"${_scopeId}><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600"${_scopeId}></div><p class="mt-4 text-gray-600"${_scopeId}>Loading products...</p></div>`);
            } else if (unref(error)) {
              _push2(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</div>`);
            } else {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Product </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Category </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Price </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="relative px-6 py-3"${_scopeId}><span class="sr-only"${_scopeId}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(unref(products), (product) => {
                var _a;
                _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}><div class="h-10 w-10 flex-shrink-0"${_scopeId}>`);
                if (product.images[0]) {
                  _push2(`<img class="h-10 w-10 rounded object-cover"${ssrRenderAttr("src", product.images[0])}${ssrRenderAttr("alt", product.name)}${_scopeId}>`);
                } else {
                  _push2(`<div class="h-10 w-10 rounded bg-gray-200 flex items-center justify-center"${_scopeId}><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div>`);
                }
                _push2(`</div><div class="ml-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(product.name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(product.slug)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = product.category) == null ? void 0 : _a.name) || "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>$${ssrInterpolate(product.price.toFixed ? product.price.toFixed(2) : product.price)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([
                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                  product.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                ])}"${_scopeId}>${ssrInterpolate(product.isAvailable ? "Available" : "Unavailable")}</span></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/admin/products/${product.id}`,
                  class: "text-primary-600 hover:text-primary-900 mr-4"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Edit `);
                    } else {
                      return [
                        createTextVNode(" Edit ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="text-red-600 hover:text-red-900"${_scopeId}> Delete </button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
              if (unref(products).length === 0) {
                _push2(`<div class="text-center py-12"${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No products</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Get started by adding a new product.</p><div class="mt-6"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: "/admin/products/create",
                  class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg> Add Product `);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          class: "-ml-1 mr-2 h-5 w-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Add Product ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, [
                createVNode("div", { class: "flex justify-between items-center mb-8" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Products"),
                    createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Manage your product inventory")
                  ]),
                  createVNode(_component_NuxtLink, {
                    to: "/admin/products/create",
                    class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        class: "-ml-1 mr-2 h-5 w-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 4v16m8-8H4"
                        })
                      ])),
                      createTextVNode(" Add Product ")
                    ]),
                    _: 1
                  })
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-12"
                }, [
                  createVNode("div", { class: "inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600" }),
                  createVNode("p", { class: "mt-4 text-gray-600" }, "Loading products...")
                ])) : unref(error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
                }, toDisplayString(unref(error)), 1)) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "bg-white shadow overflow-hidden sm:rounded-lg"
                }, [
                  createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        }, " Product "),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        }, " Category "),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        }, " Price "),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        }, " Status "),
                        createVNode("th", {
                          scope: "col",
                          class: "relative px-6 py-3"
                        }, [
                          createVNode("span", { class: "sr-only" }, "Actions")
                        ])
                      ])
                    ]),
                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (product) => {
                        var _a;
                        return openBlock(), createBlock("tr", {
                          key: product.id
                        }, [
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "h-10 w-10 flex-shrink-0" }, [
                                product.images[0] ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  class: "h-10 w-10 rounded object-cover",
                                  src: product.images[0],
                                  alt: product.name
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "h-10 w-10 rounded bg-gray-200 flex items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-6 w-6 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    })
                                  ]))
                                ]))
                              ]),
                              createVNode("div", { class: "ml-4" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(product.name), 1),
                                createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(product.slug), 1)
                              ])
                            ])
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_a = product.category) == null ? void 0 : _a.name) || "N/A"), 1)
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("div", { class: "text-sm text-gray-900" }, "$" + toDisplayString(product.price.toFixed ? product.price.toFixed(2) : product.price), 1)
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("span", {
                              class: [
                                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                product.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              ]
                            }, toDisplayString(product.isAvailable ? "Available" : "Unavailable"), 3)
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                            createVNode(_component_NuxtLink, {
                              to: `/admin/products/${product.id}`,
                              class: "text-primary-600 hover:text-primary-900 mr-4"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Edit ")
                              ]),
                              _: 1
                            }, 8, ["to"]),
                            createVNode("button", {
                              onClick: ($event) => deleteProduct(product.id),
                              class: "text-red-600 hover:text-red-900"
                            }, " Delete ", 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  unref(products).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "mx-auto h-12 w-12 text-gray-400",
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
                    ])),
                    createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No products"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Get started by adding a new product."),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode(_component_NuxtLink, {
                        to: "/admin/products/create",
                        class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "-ml-1 mr-2 h-5 w-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 4v16m8-8H4"
                            })
                          ])),
                          createTextVNode(" Add Product ")
                        ]),
                        _: 1
                      })
                    ])
                  ])) : createCommentVNode("", true)
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BHA1uYdj.mjs.map
