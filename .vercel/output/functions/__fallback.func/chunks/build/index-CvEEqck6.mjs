import { _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
    const orders = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedStatus = ref("ALL");
    const statusFilters = [
      { label: "All Orders", value: "ALL" },
      { label: "Pending", value: "PENDING" },
      { label: "Processing", value: "PROCESSING" },
      { label: "Shipped", value: "SHIPPED" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" }
    ];
    const filteredOrders = computed(() => {
      if (selectedStatus.value === "ALL") {
        return orders.value;
      }
      return orders.value.filter((order) => order.status === selectedStatus.value);
    });
    const getStatusCount = (status) => {
      if (status === "ALL") {
        return orders.value.length;
      }
      return orders.value.filter((order) => order.status === status).length;
    };
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Orders</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Manage customer orders and fulfillment</p></div><div class="border-b border-gray-200 mb-6"${_scopeId}><nav class="-mb-px flex space-x-8" aria-label="Tabs"${_scopeId}><!--[-->`);
            ssrRenderList(statusFilters, (status) => {
              _push2(`<button class="${ssrRenderClass([
                unref(selectedStatus) === status.value ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              ])}"${_scopeId}>${ssrInterpolate(status.label)} `);
              if (getStatusCount(status.value) > 0) {
                _push2(`<span class="${ssrRenderClass([
                  unref(selectedStatus) === status.value ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-900",
                  "ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium inline-block"
                ])}"${_scopeId}>${ssrInterpolate(getStatusCount(status.value))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button>`);
            });
            _push2(`<!--]--></nav></div>`);
            if (unref(loading)) {
              _push2(`<div class="text-center py-12"${_scopeId}><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600"${_scopeId}></div><p class="mt-4 text-gray-600"${_scopeId}>Loading orders...</p></div>`);
            } else if (unref(error)) {
              _push2(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(filteredOrders), (order) => {
                _push2(`<div class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Order #${ssrInterpolate(order.orderNumber)}</h3><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(order.createdAt))}</p></div><div class="flex items-center space-x-3"${_scopeId}><span class="${ssrRenderClass([
                  "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                  getStatusColor(order.status)
                ])}"${_scopeId}>${ssrInterpolate(order.status)}</span>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/admin/orders/${order.id}`,
                  class: "text-primary-600 hover:text-primary-900 text-sm font-medium"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View Details \u2192 `);
                    } else {
                      return [
                        createTextVNode(" View Details \u2192 ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"${_scopeId}><div${_scopeId}><p class="text-gray-500 mb-1"${_scopeId}>Customer</p><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(order.customerName)}</p><p class="text-gray-600"${_scopeId}>${ssrInterpolate(order.customerEmail)}</p></div><div${_scopeId}><p class="text-gray-500 mb-1"${_scopeId}>Items</p><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(order.items.length)} item(s)</p></div><div${_scopeId}><p class="text-gray-500 mb-1"${_scopeId}>Total</p><p class="font-medium text-gray-900 text-lg"${_scopeId}>$${ssrInterpolate(order.totalAmount.toFixed(2))}</p></div></div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (unref(filteredOrders).length === 0) {
                _push2(`<div class="text-center py-12 bg-white rounded-lg shadow"${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No orders found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(selectedStatus) === "ALL" ? "No orders have been placed yet." : `No ${unref(selectedStatus).toLowerCase()} orders.`)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Orders"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Manage customer orders and fulfillment")
                ]),
                createVNode("div", { class: "border-b border-gray-200 mb-6" }, [
                  createVNode("nav", {
                    class: "-mb-px flex space-x-8",
                    "aria-label": "Tabs"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(statusFilters, (status) => {
                      return createVNode("button", {
                        key: status.value,
                        onClick: ($event) => selectedStatus.value = status.value,
                        class: [
                          unref(selectedStatus) === status.value ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        ]
                      }, [
                        createTextVNode(toDisplayString(status.label) + " ", 1),
                        getStatusCount(status.value) > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: [
                            unref(selectedStatus) === status.value ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-900",
                            "ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium inline-block"
                          ]
                        }, toDisplayString(getStatusCount(status.value)), 3)) : createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 64))
                  ])
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-12"
                }, [
                  createVNode("div", { class: "inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600" }),
                  createVNode("p", { class: "mt-4 text-gray-600" }, "Loading orders...")
                ])) : unref(error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
                }, toDisplayString(unref(error)), 1)) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredOrders), (order) => {
                    return openBlock(), createBlock("div", {
                      key: order.id,
                      class: "bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Order #" + toDisplayString(order.orderNumber), 1),
                            createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(order.createdAt)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center space-x-3" }, [
                            createVNode("span", {
                              class: [
                                "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                                getStatusColor(order.status)
                              ]
                            }, toDisplayString(order.status), 3),
                            createVNode(_component_NuxtLink, {
                              to: `/admin/orders/${order.id}`,
                              class: "text-primary-600 hover:text-primary-900 text-sm font-medium"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" View Details \u2192 ")
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 mb-1" }, "Customer"),
                            createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(order.customerName), 1),
                            createVNode("p", { class: "text-gray-600" }, toDisplayString(order.customerEmail), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 mb-1" }, "Items"),
                            createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(order.items.length) + " item(s)", 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 mb-1" }, "Total"),
                            createVNode("p", { class: "font-medium text-gray-900 text-lg" }, "$" + toDisplayString(order.totalAmount.toFixed(2)), 1)
                          ])
                        ])
                      ])
                    ]);
                  }), 128)),
                  unref(filteredOrders).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12 bg-white rounded-lg shadow"
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
                        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      })
                    ])),
                    createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No orders found"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(unref(selectedStatus) === "ALL" ? "No orders have been placed yet." : `No ${unref(selectedStatus).toLowerCase()} orders.`), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CvEEqck6.mjs.map
