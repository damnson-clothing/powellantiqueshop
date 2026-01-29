import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const featuredProducts = ref([]);
    const loading = ref(true);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH").format(Number(price));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"><div class="container-custom text-center"><h1 class="text-5xl font-serif font-bold mb-4">Powell&#39;s Antique Shop</h1><p class="text-xl mb-8">Vintage Bags &amp; Collectibles Since 2010</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Shop Now `);
          } else {
            return [
              createTextVNode(" Shop Now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="container-custom py-16"><h2 class="text-3xl font-serif font-bold text-center mb-12">Featured Items</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">`);
      if (unref(loading)) {
        _push(`<div class="col-span-full text-center py-12"><p class="text-gray-500">Loading featured items...</p></div>`);
      } else if (unref(featuredProducts).length === 0) {
        _push(`<div class="col-span-full text-center py-12"><p class="text-gray-500">No featured products available.</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(featuredProducts), (product) => {
          _push(`<div class="card hover:shadow-xl transition">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${product.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="aspect-square bg-gray-200 overflow-hidden"${_scopeId}>`);
                if (product.images && product.images[0]) {
                  _push2(`<img${ssrRenderAttr("src", product.images[0])}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover hover:scale-105 transition duration-300"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="p-4"${_scopeId}><h3 class="font-serif font-bold text-lg mb-2"${_scopeId}>${ssrInterpolate(product.name)}</h3><p class="text-gray-600 text-sm mb-2 line-clamp-2"${_scopeId}>${ssrInterpolate(product.description)}</p><div class="flex items-center justify-between"${_scopeId}><span class="text-primary-600 font-bold text-xl"${_scopeId}>\u20B1${ssrInterpolate(formatPrice(product.price))}</span><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(product.condition)}</span></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "aspect-square bg-gray-200 overflow-hidden" }, [
                    product.images && product.images[0] ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: product.images[0],
                      alt: product.name,
                      class: "w-full h-full object-cover hover:scale-105 transition duration-300"
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "p-4" }, [
                    createVNode("h3", { class: "font-serif font-bold text-lg mb-2" }, toDisplayString(product.name), 1),
                    createVNode("p", { class: "text-gray-600 text-sm mb-2 line-clamp-2" }, toDisplayString(product.description), 1),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "text-primary-600 font-bold text-xl" }, "\u20B1" + toDisplayString(formatPrice(product.price)), 1),
                      createVNode("span", { class: "text-sm text-gray-500" }, toDisplayString(product.condition), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div class="text-center mt-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn btn-primary px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Products `);
          } else {
            return [
              createTextVNode(" View All Products ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="bg-secondary-50 py-16"><div class="container-custom"><div class="max-w-3xl mx-auto text-center"><h2 class="text-3xl font-serif font-bold mb-6">Our Story</h2><p class="text-gray-700 mb-6"> Founded in 2010 by Joy V. Powell and Nilo U. Powell, Powell&#39;s Antique Shop has been bringing the beauty of vintage bags and collectibles to Baguio City. From our humble beginnings at EastPark Harrison Road to our current location at Skyworld, Session Road, we&#39;ve grown with our community while maintaining our commitment to quality and authenticity. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "btn btn-outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Learn More About Us `);
          } else {
            return [
              createTextVNode(" Learn More About Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CIPJrFlR.mjs.map
