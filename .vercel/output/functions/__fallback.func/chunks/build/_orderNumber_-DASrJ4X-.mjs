import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { c as useRoute, u as useHead } from './server.mjs';
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
  __name: "[orderNumber]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.orderNumber;
    const order = ref(null);
    const loading = ref(true);
    const error = ref(false);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH").format(Number(price));
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    useHead({
      title: "Order Confirmation | Powell's Antique Shop"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-custom py-8" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-12"><p class="text-gray-500">Loading order details...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12"><h2 class="text-2xl font-bold text-red-600 mb-4">Order Not Found</h2><p class="text-gray-600 mb-6">We couldn&#39;t find this order.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn btn-primary"
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
      } else if (unref(order)) {
        _push(`<div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"><svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-3xl font-serif font-bold text-gray-900 mb-2">Order Confirmed!</h1><p class="text-gray-600">Thank you for your order. We&#39;ll contact you soon to arrange payment and delivery.</p></div><div class="bg-white rounded-lg shadow-lg p-8 mb-6"><div class="border-b pb-4 mb-6"><h2 class="text-xl font-bold mb-2">Order Details</h2><div class="flex justify-between items-center"><div><p class="text-sm text-gray-600">Order Number</p><p class="text-lg font-mono font-bold text-primary-600">${ssrInterpolate(unref(order).orderNumber)}</p></div><div class="text-right"><p class="text-sm text-gray-600">Order Date</p><p class="font-semibold">${ssrInterpolate(formatDate(unref(order).createdAt))}</p></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b"><div><h3 class="font-bold mb-2">Customer Information</h3><p class="text-gray-700">${ssrInterpolate(unref(order).customerName)}</p><p class="text-gray-600 text-sm">${ssrInterpolate(unref(order).customerEmail)}</p><p class="text-gray-600 text-sm">${ssrInterpolate(unref(order).customerPhone)}</p></div><div><h3 class="font-bold mb-2">Shipping Address</h3><p class="text-gray-700 whitespace-pre-line">${ssrInterpolate(unref(order).shippingAddress)}</p></div></div><div class="mb-6"><h3 class="font-bold mb-4">Order Items</h3><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(order).items, (item) => {
          _push(`<div class="flex gap-4 pb-4 border-b last:border-0"><div class="w-20 h-20 bg-gray-200 rounded flex-shrink-0">`);
          if (item.product && item.product.images && item.product.images[0]) {
            _push(`<img${ssrRenderAttr("src", item.product.images[0])}${ssrRenderAttr("alt", item.productName)} class="w-full h-full object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-grow"><p class="font-semibold">${ssrInterpolate(item.productName)}</p><p class="text-sm text-gray-600">Quantity: ${ssrInterpolate(item.quantity)}</p></div><div class="text-right"><p class="font-bold text-primary-600">\u20B1${ssrInterpolate(formatPrice(item.productPrice))}</p></div></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2"><div class="flex justify-between text-gray-700"><span>Subtotal</span><span class="font-semibold">\u20B1${ssrInterpolate(formatPrice(unref(order).subtotal))}</span></div><div class="flex justify-between text-gray-700"><span>Shipping</span><span class="text-sm text-gray-500">To be arranged</span></div><div class="flex justify-between text-xl font-bold border-t pt-2"><span>Total</span><span class="text-primary-600">\u20B1${ssrInterpolate(formatPrice(unref(order).total))}</span></div></div>`);
        if (unref(order).customerNotes) {
          _push(`<div class="mt-6 pt-6 border-t"><h3 class="font-bold mb-2">Order Notes</h3><p class="text-gray-700">${ssrInterpolate(unref(order).customerNotes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6"><h3 class="font-bold text-blue-900 mb-3">What happens next?</h3><ul class="space-y-2 text-blue-800 text-sm"><li class="flex items-start"><svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span>We&#39;ll contact you via email or phone to confirm your order</span></li><li class="flex items-start"><svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span>We&#39;ll arrange payment and shipping details with you</span></li><li class="flex items-start"><svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span>Your items will be carefully packaged and shipped</span></li></ul></div><div class="bg-gray-50 rounded-lg p-6 text-center"><p class="text-gray-700 mb-4">Questions about your order?</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "btn btn-outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Contact Us `);
            } else {
              return [
                createTextVNode(" Contact Us ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn btn-primary ml-4"
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/order-confirmation/[orderNumber].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_orderNumber_-DASrJ4X-.mjs.map
