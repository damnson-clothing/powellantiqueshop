import { _ as __nuxt_component_0 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(true);
    const pagination = ref({ page: 1, limit: 12, total: 0, totalPages: 0 });
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const selectedCondition = ref("");
    const minPrice = ref(null);
    const maxPrice = ref(null);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-PH").format(Number(price));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-custom py-12" }, _attrs))}><h1 class="text-4xl font-serif font-bold mb-8">Our Products</h1><div class="mb-8 bg-white p-6 rounded-lg shadow"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="md:col-span-2"><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search products..." class="input"></div><div><select class="input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.slug)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), cat.slug) : ssrLooseEqual(unref(selectedCategory), cat.slug)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><select class="input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "") : ssrLooseEqual(unref(selectedCondition), "")) ? " selected" : ""}>All Conditions</option><option value="Excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "Excellent") : ssrLooseEqual(unref(selectedCondition), "Excellent")) ? " selected" : ""}>Excellent</option><option value="Good"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "Good") : ssrLooseEqual(unref(selectedCondition), "Good")) ? " selected" : ""}>Good</option><option value="Fair"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "Fair") : ssrLooseEqual(unref(selectedCondition), "Fair")) ? " selected" : ""}>Fair</option><option value="Vintage"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCondition)) ? ssrLooseContain(unref(selectedCondition), "Vintage") : ssrLooseEqual(unref(selectedCondition), "Vintage")) ? " selected" : ""}>Vintage</option></select></div></div><div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Min Price</label><input${ssrRenderAttr("value", unref(minPrice))} type="number" placeholder="Min" class="input"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Max Price</label><input${ssrRenderAttr("value", unref(maxPrice))} type="number" placeholder="Max" class="input"></div></div><button class="mt-4 text-sm text-primary-600 hover:text-primary-700"> Clear all filters </button></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-12"><p class="text-gray-500">Loading products...</p></div>`);
      } else if (unref(products).length === 0) {
        _push(`<div class="text-center py-12"><p class="text-gray-500">No products found.</p></div>`);
      } else {
        _push(`<div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(unref(products), (product) => {
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
                _push2(`</div><div class="p-4"${_scopeId}><div class="text-xs text-primary-600 mb-1"${_scopeId}>${ssrInterpolate(product.category.name)}</div><h3 class="font-serif font-bold text-lg mb-2"${_scopeId}>${ssrInterpolate(product.name)}</h3><p class="text-gray-600 text-sm mb-2 line-clamp-2"${_scopeId}>${ssrInterpolate(product.description)}</p><div class="flex items-center justify-between"${_scopeId}><span class="text-primary-600 font-bold text-xl"${_scopeId}>\u20B1${ssrInterpolate(formatPrice(product.price))}</span><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(product.condition)}</span></div></div>`);
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
                    createVNode("div", { class: "text-xs text-primary-600 mb-1" }, toDisplayString(product.category.name), 1),
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
        _push(`<!--]--></div>`);
        if (unref(pagination).totalPages > 1) {
          _push(`<div class="mt-8 flex justify-center items-center space-x-2"><button${ssrIncludeBooleanAttr(unref(pagination).page === 1) ? " disabled" : ""} class="btn btn-outline disabled:opacity-50"> Previous </button><span class="text-gray-600"> Page ${ssrInterpolate(unref(pagination).page)} of ${ssrInterpolate(unref(pagination).totalPages)}</span><button${ssrIncludeBooleanAttr(unref(pagination).page === unref(pagination).totalPages) ? " disabled" : ""} class="btn btn-outline disabled:opacity-50"> Next </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DI2R-lCA.mjs.map
