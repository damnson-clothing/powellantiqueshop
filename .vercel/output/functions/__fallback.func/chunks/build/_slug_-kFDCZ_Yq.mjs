import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.slug;
    const product = ref(null);
    const relatedProducts = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const selectedImage = ref("");
    const showImageModal = ref(false);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH").format(Number(price));
    };
    useHead(() => {
      var _a;
      return {
        title: product.value ? `${product.value.name} | Powell's Antique Shop` : "Loading...",
        meta: [
          {
            name: "description",
            content: ((_a = product.value) == null ? void 0 : _a.description) || "Vintage bags and collectibles"
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-custom py-8" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-12"><p class="text-gray-500">Loading product details...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12"><h2 class="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2><p class="text-gray-600 mb-6">The product you&#39;re looking for doesn&#39;t exist or has been removed.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Products `);
            } else {
              return [
                createTextVNode(" Back to Products ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(product)) {
        _push(`<div><nav class="text-sm text-gray-500 mb-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-primary-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="mx-2">/</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "hover:text-primary-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Products`);
            } else {
              return [
                createTextVNode("Products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="mx-2">/</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/products?category=${unref(product).category.slug}`,
          class: "hover:text-primary-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(product).category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(product).category.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="mx-2">/</span><span class="text-gray-900">${ssrInterpolate(unref(product).name)}</span></nav><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"><div><div class="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square"><img${ssrRenderAttr("src", unref(selectedImage) || unref(product).images[0] || "/placeholder-product.jpg")}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition duration-300"></div>`);
        if (unref(product).images && unref(product).images.length > 1) {
          _push(`<div class="grid grid-cols-4 gap-2"><!--[-->`);
          ssrRenderList(unref(product).images, (image, index) => {
            _push(`<div class="${ssrRenderClass([unref(selectedImage) === image ? "border-primary-600" : "border-transparent hover:border-gray-300", "aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer border-2 transition"])}"><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `${unref(product).name} ${Number(index) + 1}`)} class="w-full h-full object-cover"></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><div class="mb-3"><span class="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">${ssrInterpolate(unref(product).category.name)}</span></div><h1 class="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">${ssrInterpolate(unref(product).name)}</h1><div class="flex items-center justify-between mb-6 pb-6 border-b"><div><p class="text-4xl font-bold text-primary-600">\u20B1${ssrInterpolate(formatPrice(unref(product).price))}</p></div><div class="text-right"><p class="text-sm text-gray-500">Condition</p><p class="text-lg font-semibold text-gray-900">${ssrInterpolate(unref(product).condition)}</p></div></div><div class="mb-6">`);
        if (unref(product).isAvailable) {
          _push(`<div class="flex items-center text-green-600"><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span class="font-semibold">In Stock</span></div>`);
        } else {
          _push(`<div class="flex items-center text-red-600"><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg><span class="font-semibold">Sold Out</span></div>`);
        }
        _push(`</div>`);
        if (unref(product).isAvailable) {
          _push(`<button class="w-full btn btn-primary py-4 text-lg mb-4"><svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> Add to Cart </button>`);
        } else {
          _push(`<button disabled class="w-full btn bg-gray-300 text-gray-500 cursor-not-allowed py-4 text-lg mb-4"> Sold Out </button>`);
        }
        if (unref(product).material) {
          _push(`<div class="bg-gray-50 rounded-lg p-4 mb-6"><h3 class="text-sm font-semibold text-gray-700 mb-1">Material</h3><p class="text-gray-900">${ssrInterpolate(unref(product).material)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-6"><h2 class="text-xl font-serif font-bold mb-3">Description</h2><p class="text-gray-700 leading-relaxed whitespace-pre-line">${ssrInterpolate(unref(product).description)}</p></div>`);
        if (unref(product).history) {
          _push(`<div class="bg-secondary-50 rounded-lg p-6 mb-6"><h2 class="text-xl font-serif font-bold mb-3">Item History</h2><p class="text-gray-700 leading-relaxed whitespace-pre-line">${ssrInterpolate(unref(product).history)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="border-t pt-6"><p class="text-sm text-gray-600 mb-2">Questions about this item?</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "text-primary-600 hover:text-primary-700 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Contact us \u2192 `);
            } else {
              return [
                createTextVNode(" Contact us \u2192 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
        if (unref(relatedProducts) && unref(relatedProducts).length > 0) {
          _push(`<div class="mt-16"><h2 class="text-2xl font-serif font-bold mb-6">Similar Items You May Like</h2><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"><!--[-->`);
          ssrRenderList(unref(relatedProducts), (item) => {
            _push(`<div class="card hover:shadow-xl transition">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/products/${item.slug}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-square bg-gray-200 overflow-hidden"${_scopeId}>`);
                  if (item.images && item.images[0]) {
                    _push2(`<img${ssrRenderAttr("src", item.images[0])}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover hover:scale-105 transition duration-300"${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="p-4"${_scopeId}><h3 class="font-serif font-bold text-lg mb-2 line-clamp-2"${_scopeId}>${ssrInterpolate(item.name)}</h3><div class="flex items-center justify-between"${_scopeId}><span class="text-primary-600 font-bold"${_scopeId}>\u20B1${ssrInterpolate(formatPrice(item.price))}</span><span class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(item.condition)}</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "aspect-square bg-gray-200 overflow-hidden" }, [
                      item.images && item.images[0] ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: item.images[0],
                        alt: item.name,
                        class: "w-full h-full object-cover hover:scale-105 transition duration-300"
                      }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "p-4" }, [
                      createVNode("h3", { class: "font-serif font-bold text-lg mb-2 line-clamp-2" }, toDisplayString(item.name), 1),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "text-primary-600 font-bold" }, "\u20B1" + toDisplayString(formatPrice(item.price)), 1),
                        createVNode("span", { class: "text-xs text-gray-500" }, toDisplayString(item.condition), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showImageModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"><button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"> \xD7 </button><img${ssrRenderAttr("src", unref(selectedImage) || unref(product).images[0])}${ssrRenderAttr("alt", unref(product).name)} class="max-w-full max-h-full object-contain"></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-kFDCZ_Yq.mjs.map
