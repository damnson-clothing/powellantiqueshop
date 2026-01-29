import { c as useRoute, _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, toDisplayString, withDirectives, isRef, vModelSelect, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const orderId = route.params.id;
    const order = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const newStatus = ref("");
    const updating = ref(false);
    const getStatusColor = (status) => {
      const colors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        PROCESSING: "bg-blue-100 text-blue-800",
        SHIPPED: "bg-purple-100 text-purple-800",
        COMPLETED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      }).format(date);
    };
    const updateStatus = async () => {
      if (newStatus.value === order.value.status) {
        return;
      }
      try {
        updating.value = true;
        const updatedOrder = await $fetch(`/api/admin/orders/${orderId}`, {
          method: "PUT",
          body: { status: newStatus.value }
        });
        order.value = updatedOrder;
        alert("Order status updated successfully!");
      } catch (err) {
        alert(err.message || "Failed to update order status");
        newStatus.value = order.value.status;
      } finally {
        updating.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"${_scopeId}><div class="mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/orders",
              class: "text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u2190 Back to Orders `);
                } else {
                  return [
                    createTextVNode(" \u2190 Back to Orders ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Order Details</h1></div>`);
            if (unref(loading)) {
              _push2(`<div class="text-center py-12"${_scopeId}><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600"${_scopeId}></div><p class="mt-4 text-gray-600"${_scopeId}>Loading order...</p></div>`);
            } else if (unref(error)) {
              _push2(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</div>`);
            } else {
              _push2(`<div class="space-y-6"${_scopeId}><div class="bg-white shadow rounded-lg p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>Order #${ssrInterpolate(unref(order).orderNumber)}</h2><p class="text-sm text-gray-500 mt-1"${_scopeId}>Placed on ${ssrInterpolate(formatDate(unref(order).createdAt))}</p></div><span class="${ssrRenderClass([
                "px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full",
                getStatusColor(unref(order).status)
              ])}"${_scopeId}>${ssrInterpolate(unref(order).status)}</span></div><div class="mt-6 pt-6 border-t border-gray-200"${_scopeId}><label for="status" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Update Order Status</label><div class="flex items-center space-x-3"${_scopeId}><select id="status" class="block w-64 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}><option value="PENDING"${ssrIncludeBooleanAttr(Array.isArray(unref(newStatus)) ? ssrLooseContain(unref(newStatus), "PENDING") : ssrLooseEqual(unref(newStatus), "PENDING")) ? " selected" : ""}${_scopeId}>Pending</option><option value="PROCESSING"${ssrIncludeBooleanAttr(Array.isArray(unref(newStatus)) ? ssrLooseContain(unref(newStatus), "PROCESSING") : ssrLooseEqual(unref(newStatus), "PROCESSING")) ? " selected" : ""}${_scopeId}>Processing</option><option value="SHIPPED"${ssrIncludeBooleanAttr(Array.isArray(unref(newStatus)) ? ssrLooseContain(unref(newStatus), "SHIPPED") : ssrLooseEqual(unref(newStatus), "SHIPPED")) ? " selected" : ""}${_scopeId}>Shipped</option><option value="COMPLETED"${ssrIncludeBooleanAttr(Array.isArray(unref(newStatus)) ? ssrLooseContain(unref(newStatus), "COMPLETED") : ssrLooseEqual(unref(newStatus), "COMPLETED")) ? " selected" : ""}${_scopeId}>Completed</option><option value="CANCELLED"${ssrIncludeBooleanAttr(Array.isArray(unref(newStatus)) ? ssrLooseContain(unref(newStatus), "CANCELLED") : ssrLooseEqual(unref(newStatus), "CANCELLED")) ? " selected" : ""}${_scopeId}>Cancelled</option></select><button${ssrIncludeBooleanAttr(unref(updating) || unref(newStatus) === unref(order).status) ? " disabled" : ""} class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(unref(updating) ? "Updating..." : "Update Status")}</button></div></div></div><div class="bg-white shadow rounded-lg p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Customer Information</h3><dl class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Name</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(unref(order).customerName)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Email</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(unref(order).customerEmail)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Phone</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(unref(order).customerPhone || "N/A")}</dd></div><div class="sm:col-span-2"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Shipping Address</dt><dd class="mt-1 text-sm text-gray-900 whitespace-pre-line"${_scopeId}>${ssrInterpolate(unref(order).shippingAddress)}</dd></div>`);
              if (unref(order).orderNotes) {
                _push2(`<div class="sm:col-span-2"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Order Notes</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(unref(order).orderNotes)}</dd></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</dl></div><div class="bg-white shadow rounded-lg p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Order Items</h3><div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(order).items, (item) => {
                _push2(`<div class="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0"${_scopeId}>`);
                if (item.productSnapshot.images[0]) {
                  _push2(`<img${ssrRenderAttr("src", item.productSnapshot.images[0])}${ssrRenderAttr("alt", item.productSnapshot.name)} class="h-16 w-16 rounded object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="h-16 w-16 rounded bg-gray-200 flex items-center justify-center"${_scopeId}><svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div>`);
                }
                _push2(`<div class="flex-1"${_scopeId}><h4 class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(item.productSnapshot.name)}</h4><p class="text-sm text-gray-500"${_scopeId}>Quantity: ${ssrInterpolate(item.quantity)}</p></div><div class="text-right"${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>$${ssrInterpolate(item.price.toFixed(2))}</p><p class="text-xs text-gray-500"${_scopeId}>each</p></div></div>`);
              });
              _push2(`<!--]--></div><div class="mt-6 pt-6 border-t border-gray-200"${_scopeId}><div class="flex justify-between text-base font-medium text-gray-900"${_scopeId}><p${_scopeId}>Total</p><p class="text-2xl"${_scopeId}>$${ssrInterpolate(unref(order).totalAmount.toFixed(2))}</p></div></div></div><div class="bg-white shadow rounded-lg p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Order History</h3><div class="flow-root"${_scopeId}><ul class="-mb-8"${_scopeId}><!--[-->`);
              ssrRenderList(unref(order).statusHistory, (history, idx) => {
                _push2(`<li${_scopeId}><div class="relative pb-8"${_scopeId}>`);
                if (idx !== unref(order).statusHistory.length - 1) {
                  _push2(`<span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="relative flex space-x-3"${_scopeId}><div${_scopeId}><span class="${ssrRenderClass([
                  "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
                  getStatusColor(history.status).replace("text-", "bg-").split(" ")[0]
                ])}"${_scopeId}><svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></span></div><div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-900 font-medium"${_scopeId}>Status changed to ${ssrInterpolate(history.status)}</p></div><div class="whitespace-nowrap text-right text-sm text-gray-500"${_scopeId}><time${_scopeId}>${ssrInterpolate(formatDate(history.createdAt))}</time></div></div></div></div></li>`);
              });
              _push2(`<!--]--></ul></div></div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/admin/orders",
                    class: "text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u2190 Back to Orders ")
                    ]),
                    _: 1
                  }),
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Order Details")
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-12"
                }, [
                  createVNode("div", { class: "inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600" }),
                  createVNode("p", { class: "mt-4 text-gray-600" }, "Loading order...")
                ])) : unref(error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
                }, toDisplayString(unref(error)), 1)) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, "Order #" + toDisplayString(unref(order).orderNumber), 1),
                        createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "Placed on " + toDisplayString(formatDate(unref(order).createdAt)), 1)
                      ]),
                      createVNode("span", {
                        class: [
                          "px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full",
                          getStatusColor(unref(order).status)
                        ]
                      }, toDisplayString(unref(order).status), 3)
                    ]),
                    createVNode("div", { class: "mt-6 pt-6 border-t border-gray-200" }, [
                      createVNode("label", {
                        for: "status",
                        class: "block text-sm font-medium text-gray-700 mb-2"
                      }, "Update Order Status"),
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        withDirectives(createVNode("select", {
                          id: "status",
                          "onUpdate:modelValue": ($event) => isRef(newStatus) ? newStatus.value = $event : null,
                          class: "block w-64 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        }, [
                          createVNode("option", { value: "PENDING" }, "Pending"),
                          createVNode("option", { value: "PROCESSING" }, "Processing"),
                          createVNode("option", { value: "SHIPPED" }, "Shipped"),
                          createVNode("option", { value: "COMPLETED" }, "Completed"),
                          createVNode("option", { value: "CANCELLED" }, "Cancelled")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(newStatus)]
                        ]),
                        createVNode("button", {
                          onClick: updateStatus,
                          disabled: unref(updating) || unref(newStatus) === unref(order).status,
                          class: "inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        }, toDisplayString(unref(updating) ? "Updating..." : "Update Status"), 9, ["disabled"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Customer Information"),
                    createVNode("dl", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Name"),
                        createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(unref(order).customerName), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Email"),
                        createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(unref(order).customerEmail), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Phone"),
                        createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(unref(order).customerPhone || "N/A"), 1)
                      ]),
                      createVNode("div", { class: "sm:col-span-2" }, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Shipping Address"),
                        createVNode("dd", { class: "mt-1 text-sm text-gray-900 whitespace-pre-line" }, toDisplayString(unref(order).shippingAddress), 1)
                      ]),
                      unref(order).orderNotes ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "sm:col-span-2"
                      }, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Order Notes"),
                        createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(unref(order).orderNotes), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Order Items"),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(order).items, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0"
                        }, [
                          item.productSnapshot.images[0] ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: item.productSnapshot.images[0],
                            alt: item.productSnapshot.name,
                            class: "h-16 w-16 rounded object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "h-16 w-16 rounded bg-gray-200 flex items-center justify-center"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-8 w-8 text-gray-400",
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
                          ])),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("h4", { class: "text-sm font-medium text-gray-900" }, toDisplayString(item.productSnapshot.name), 1),
                            createVNode("p", { class: "text-sm text-gray-500" }, "Quantity: " + toDisplayString(item.quantity), 1)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900" }, "$" + toDisplayString(item.price.toFixed(2)), 1),
                            createVNode("p", { class: "text-xs text-gray-500" }, "each")
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "mt-6 pt-6 border-t border-gray-200" }, [
                      createVNode("div", { class: "flex justify-between text-base font-medium text-gray-900" }, [
                        createVNode("p", null, "Total"),
                        createVNode("p", { class: "text-2xl" }, "$" + toDisplayString(unref(order).totalAmount.toFixed(2)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Order History"),
                    createVNode("div", { class: "flow-root" }, [
                      createVNode("ul", { class: "-mb-8" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(order).statusHistory, (history, idx) => {
                          return openBlock(), createBlock("li", {
                            key: history.id
                          }, [
                            createVNode("div", { class: "relative pb-8" }, [
                              idx !== unref(order).statusHistory.length - 1 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200",
                                "aria-hidden": "true"
                              })) : createCommentVNode("", true),
                              createVNode("div", { class: "relative flex space-x-3" }, [
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: [
                                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
                                      getStatusColor(history.status).replace("text-", "bg-").split(" ")[0]
                                    ]
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-5 w-5 text-white",
                                      fill: "currentColor",
                                      viewBox: "0 0 20 20"
                                    }, [
                                      createVNode("path", {
                                        "fill-rule": "evenodd",
                                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                        "clip-rule": "evenodd"
                                      })
                                    ]))
                                  ], 2)
                                ]),
                                createVNode("div", { class: "flex min-w-0 flex-1 justify-between space-x-4 pt-1.5" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-sm text-gray-900 font-medium" }, "Status changed to " + toDisplayString(history.status), 1)
                                  ]),
                                  createVNode("div", { class: "whitespace-nowrap text-right text-sm text-gray-500" }, [
                                    createVNode("time", null, toDisplayString(formatDate(history.createdAt)), 1)
                                  ])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-C80-vQoU.mjs.map
