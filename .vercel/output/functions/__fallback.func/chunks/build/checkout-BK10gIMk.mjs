import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useCartStore } from './cart-CqGRwfIq.mjs';
import { b as useRouter, u as useHead } from './server.mjs';
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
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    useRouter();
    const form = ref({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      customerNotes: ""
    });
    const submitting = ref(false);
    const errorMessage = ref("");
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH").format(price);
    };
    useHead({
      title: "Checkout | Powell's Antique Shop"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-custom py-8" }, _attrs))}><h1 class="text-3xl font-serif font-bold mb-8">Checkout</h1>`);
      if (unref(cartStore).items.length === 0) {
        _push(`<div class="text-center py-16"><p class="text-gray-600 mb-4">Your cart is empty</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Browse Products `);
            } else {
              return [
                createTextVNode(" Browse Products ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<form class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-lg shadow p-6"><h2 class="text-xl font-bold mb-4">Contact Information</h2><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Full Name <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).customerName)} type="text" required class="input" placeholder="Juan Dela Cruz"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Email Address <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).customerEmail)} type="email" required class="input" placeholder="juan@example.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Phone Number <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).customerPhone)} type="tel" required class="input" placeholder="+63 912 345 6789"></div></div></div><div class="bg-white rounded-lg shadow p-6"><h2 class="text-xl font-bold mb-4">Shipping Address</h2><div><label class="block text-sm font-medium text-gray-700 mb-1"> Complete Address <span class="text-red-500">*</span></label><textarea required rows="4" class="input" placeholder="Street address, Barangay, City, Province, Postal Code">${ssrInterpolate(unref(form).shippingAddress)}</textarea></div></div><div class="bg-white rounded-lg shadow p-6"><h2 class="text-xl font-bold mb-4">Order Notes (Optional)</h2><div><label class="block text-sm font-medium text-gray-700 mb-1"> Special instructions or delivery notes </label><textarea rows="3" class="input" placeholder="E.g., Call before delivery, Leave at gate, etc.">${ssrInterpolate(unref(form).customerNotes)}</textarea></div></div>`);
        if (unref(errorMessage)) {
          _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">${ssrInterpolate(unref(errorMessage))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow p-6 sticky top-24"><h2 class="text-xl font-bold mb-4">Order Summary</h2><div class="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="flex gap-3"><div class="w-16 h-16 bg-gray-200 rounded flex-shrink-0"><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover"></div><div class="flex-grow min-w-0"><p class="font-semibold text-sm truncate">${ssrInterpolate(item.name)}</p><p class="text-primary-600 font-bold">\u20B1${ssrInterpolate(formatPrice(item.price))}</p></div></div>`);
        });
        _push(`<!--]--></div><div class="space-y-3 mb-4 pb-4 border-b"><div class="flex justify-between"><span class="text-gray-600">Subtotal</span><span class="font-semibold">\u20B1${ssrInterpolate(formatPrice(unref(cartStore).subtotal))}</span></div><div class="flex justify-between"><span class="text-gray-600">Shipping</span><span class="text-sm text-gray-500">To be arranged</span></div></div><div class="flex justify-between text-lg font-bold mb-6"><span>Total</span><span class="text-primary-600">\u20B1${ssrInterpolate(formatPrice(unref(cartStore).total))}</span></div><div class="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4 text-sm"><p class="text-yellow-800"><strong>Payment:</strong> We will contact you to arrange payment and shipping details after you place your order. </p></div><button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="btn btn-primary w-full py-3">`);
        if (unref(submitting)) {
          _push(`<span>Processing Order...</span>`);
        } else {
          _push(`<span>Place Order</span>`);
        }
        _push(`</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/cart",
          class: "btn btn-outline w-full py-3 mt-3 text-center block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Cart `);
            } else {
              return [
                createTextVNode(" Back to Cart ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-BK10gIMk.mjs.map
