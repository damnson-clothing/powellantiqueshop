import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useCartStore } from './cart-CqGRwfIq.mjs';
import { u as useHead } from './server.mjs';
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
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH").format(price);
    };
    useHead({
      title: "Shopping Cart | Powell's Antique Shop"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-custom py-8" }, _attrs))}><h1 class="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>`);
      if (unref(cartStore).items.length === 0) {
        _push(`<div class="text-center py-16"><svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg><h2 class="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2><p class="text-gray-500 mb-6">Browse our collection and add items to your cart</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn btn-primary px-8 py-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue Shopping `);
            } else {
              return [
                createTextVNode(" Continue Shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-4"><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="bg-white rounded-lg shadow p-4 flex gap-4">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${item.slug}`,
            class: "flex-shrink-0"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-24 h-24 bg-gray-200 rounded overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover"${_scopeId}></div>`);
              } else {
                return [
                  createVNode("div", { class: "w-24 h-24 bg-gray-200 rounded overflow-hidden" }, [
                    createVNode("img", {
                      src: item.image,
                      alt: item.name,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="flex-grow">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${item.slug}`,
            class: "font-serif font-bold text-lg hover:text-primary-600 mb-1 block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="text-primary-600 font-bold text-xl">\u20B1${ssrInterpolate(formatPrice(item.price))}</p></div><button class="flex-shrink-0 text-red-600 hover:text-red-700 p-2" title="Remove from cart"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
        });
        _push(`<!--]--></div><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow p-6 sticky top-24"><h2 class="text-xl font-bold mb-4">Order Summary</h2><div class="space-y-3 mb-4 pb-4 border-b"><div class="flex justify-between"><span class="text-gray-600">Items (${ssrInterpolate(unref(cartStore).itemCount)})</span><span class="font-semibold">\u20B1${ssrInterpolate(formatPrice(unref(cartStore).subtotal))}</span></div><div class="flex justify-between"><span class="text-gray-600">Shipping</span><span class="text-sm text-gray-500">Calculated at checkout</span></div></div><div class="flex justify-between text-lg font-bold mb-6"><span>Total</span><span class="text-primary-600">\u20B1${ssrInterpolate(formatPrice(unref(cartStore).total))}</span></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn btn-primary w-full py-3 text-center block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Proceed to Checkout `);
            } else {
              return [
                createTextVNode(" Proceed to Checkout ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn btn-outline w-full py-3 text-center block mt-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue Shopping `);
            } else {
              return [
                createTextVNode(" Continue Shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-CKSbohWT.mjs.map
