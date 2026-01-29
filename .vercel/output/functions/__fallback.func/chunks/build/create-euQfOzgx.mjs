import { b as useRouter, _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dg5Xpzgu.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, vModelSelect, Fragment, renderList, vModelCheckbox, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const categories = ref([]);
    const error = ref(null);
    const submitting = ref(false);
    const form = ref({
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      condition: "Excellent",
      material: "",
      history: "",
      images: [],
      isAvailable: true,
      isFeatured: false
    });
    const imagesText = ref("");
    watch(imagesText, (value) => {
      form.value.images = value.split("\n").map((url) => url.trim()).filter((url) => url.length > 0);
    });
    const handleSubmit = async () => {
      var _a;
      try {
        submitting.value = true;
        error.value = null;
        await $fetch("/api/admin/products", {
          method: "POST",
          body: form.value
        });
        alert("Product created successfully!");
        router.push("/admin/products");
      } catch (err) {
        error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to create product";
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"${_scopeId}><div class="mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/products",
              class: "text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u2190 Back to Products `);
                } else {
                  return [
                    createTextVNode(" \u2190 Back to Products ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Create New Product</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Add a new product to your inventory</p></div>`);
            if (unref(error)) {
              _push2(`<div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"${_scopeId}>${ssrInterpolate(unref(error))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-8 bg-white shadow sm:rounded-lg p-6"${_scopeId}><div class="space-y-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}>Basic Information</h2><div${_scopeId}><label for="name" class="block text-sm font-medium text-gray-700"${_scopeId}>Product Name *</label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}></div><div${_scopeId}><label for="description" class="block text-sm font-medium text-gray-700"${_scopeId}>Description *</label><textarea id="description" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label for="price" class="block text-sm font-medium text-gray-700"${_scopeId}>Price ($) *</label><input id="price"${ssrRenderAttr("value", unref(form).price)} type="number" step="0.01" min="0" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}></div><div${_scopeId}><label for="condition" class="block text-sm font-medium text-gray-700"${_scopeId}>Condition *</label><select id="condition" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}><option value="Excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "Excellent") : ssrLooseEqual(unref(form).condition, "Excellent")) ? " selected" : ""}${_scopeId}>Excellent</option><option value="Very Good"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "Very Good") : ssrLooseEqual(unref(form).condition, "Very Good")) ? " selected" : ""}${_scopeId}>Very Good</option><option value="Good"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "Good") : ssrLooseEqual(unref(form).condition, "Good")) ? " selected" : ""}${_scopeId}>Good</option><option value="Fair"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "Fair") : ssrLooseEqual(unref(form).condition, "Fair")) ? " selected" : ""}${_scopeId}>Fair</option></select></div></div><div${_scopeId}><label for="categoryId" class="block text-sm font-medium text-gray-700"${_scopeId}>Category *</label><select id="categoryId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoryId) ? ssrLooseContain(unref(form).categoryId, "") : ssrLooseEqual(unref(form).categoryId, "")) ? " selected" : ""}${_scopeId}>Select a category</option><!--[-->`);
            ssrRenderList(unref(categories), (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoryId) ? ssrLooseContain(unref(form).categoryId, category.id) : ssrLooseEqual(unref(form).categoryId, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="space-y-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}>Product Details</h2><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label for="material" class="block text-sm font-medium text-gray-700"${_scopeId}>Material</label><input id="material"${ssrRenderAttr("value", unref(form).material)} type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}></div><div class="sm:col-span-2"${_scopeId}><label for="history" class="block text-sm font-medium text-gray-700"${_scopeId}>History / Provenance</label><textarea id="history" rows="3" placeholder="Historical information about this item..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"${_scopeId}>${ssrInterpolate(unref(form).history)}</textarea></div></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2"${_scopeId}><div class="flex items-center"${_scopeId}><input id="isAvailable"${ssrIncludeBooleanAttr(Array.isArray(unref(form).isAvailable) ? ssrLooseContain(unref(form).isAvailable, null) : unref(form).isAvailable) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"${_scopeId}><label for="isAvailable" class="ml-2 block text-sm text-gray-900"${_scopeId}> Available for Purchase </label></div><div class="flex items-center"${_scopeId}><input id="isFeatured"${ssrIncludeBooleanAttr(Array.isArray(unref(form).isFeatured) ? ssrLooseContain(unref(form).isFeatured, null) : unref(form).isFeatured) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"${_scopeId}><label for="isFeatured" class="ml-2 block text-sm text-gray-900"${_scopeId}> Featured Product </label></div></div></div><div class="space-y-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}>Images</h2><p class="text-sm text-gray-500"${_scopeId}>Enter image URLs (one per line). The first image will be the main product image.</p><div${_scopeId}><textarea rows="4" placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono text-xs"${_scopeId}>${ssrInterpolate(unref(imagesText))}</textarea><p class="mt-2 text-xs text-gray-500"${_scopeId}>${ssrInterpolate(unref(form).images.length)} image(s) added </p></div></div><div class="flex justify-end space-x-3 pt-6 border-t border-gray-200"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/products",
              class: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>`);
            if (unref(submitting)) {
              _push2(`<span${_scopeId}>Creating...</span>`);
            } else {
              _push2(`<span${_scopeId}>Create Product</span>`);
            }
            _push2(`</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/admin/products",
                    class: "text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u2190 Back to Products ")
                    ]),
                    _: 1
                  }),
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Create New Product"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Add a new product to your inventory")
                ]),
                unref(error) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
                }, toDisplayString(unref(error)), 1)) : createCommentVNode("", true),
                createVNode("form", {
                  onSubmit: withModifiers(handleSubmit, ["prevent"]),
                  class: "space-y-8 bg-white shadow sm:rounded-lg p-6"
                }, [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Basic Information"),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "name",
                        class: "block text-sm font-medium text-gray-700"
                      }, "Product Name *"),
                      withDirectives(createVNode("input", {
                        id: "name",
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        type: "text",
                        required: "",
                        class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "description",
                        class: "block text-sm font-medium text-gray-700"
                      }, "Description *"),
                      withDirectives(createVNode("textarea", {
                        id: "description",
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "4",
                        required: "",
                        class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "price",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Price ($) *"),
                        withDirectives(createVNode("input", {
                          id: "price",
                          "onUpdate:modelValue": ($event) => unref(form).price = $event,
                          type: "number",
                          step: "0.01",
                          min: "0",
                          required: "",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [
                            vModelText,
                            unref(form).price,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "condition",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Condition *"),
                        withDirectives(createVNode("select", {
                          id: "condition",
                          "onUpdate:modelValue": ($event) => unref(form).condition = $event,
                          required: "",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        }, [
                          createVNode("option", { value: "Excellent" }, "Excellent"),
                          createVNode("option", { value: "Very Good" }, "Very Good"),
                          createVNode("option", { value: "Good" }, "Good"),
                          createVNode("option", { value: "Fair" }, "Fair")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).condition]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "categoryId",
                        class: "block text-sm font-medium text-gray-700"
                      }, "Category *"),
                      withDirectives(createVNode("select", {
                        id: "categoryId",
                        "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                        required: "",
                        class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      }, [
                        createVNode("option", { value: "" }, "Select a category"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (category) => {
                          return openBlock(), createBlock("option", {
                            key: category.id,
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).categoryId]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Product Details"),
                    createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "material",
                          class: "block text-sm font-medium text-gray-700"
                        }, "Material"),
                        withDirectives(createVNode("input", {
                          id: "material",
                          "onUpdate:modelValue": ($event) => unref(form).material = $event,
                          type: "text",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).material]
                        ])
                      ]),
                      createVNode("div", { class: "sm:col-span-2" }, [
                        createVNode("label", {
                          for: "history",
                          class: "block text-sm font-medium text-gray-700"
                        }, "History / Provenance"),
                        withDirectives(createVNode("textarea", {
                          id: "history",
                          "onUpdate:modelValue": ($event) => unref(form).history = $event,
                          rows: "3",
                          placeholder: "Historical information about this item...",
                          class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).history]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        withDirectives(createVNode("input", {
                          id: "isAvailable",
                          "onUpdate:modelValue": ($event) => unref(form).isAvailable = $event,
                          type: "checkbox",
                          class: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).isAvailable]
                        ]),
                        createVNode("label", {
                          for: "isAvailable",
                          class: "ml-2 block text-sm text-gray-900"
                        }, " Available for Purchase ")
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        withDirectives(createVNode("input", {
                          id: "isFeatured",
                          "onUpdate:modelValue": ($event) => unref(form).isFeatured = $event,
                          type: "checkbox",
                          class: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).isFeatured]
                        ]),
                        createVNode("label", {
                          for: "isFeatured",
                          class: "ml-2 block text-sm text-gray-900"
                        }, " Featured Product ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Images"),
                    createVNode("p", { class: "text-sm text-gray-500" }, "Enter image URLs (one per line). The first image will be the main product image."),
                    createVNode("div", null, [
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => isRef(imagesText) ? imagesText.value = $event : null,
                        rows: "4",
                        placeholder: "https://example.com/image1.jpg\nhttps://example.com/image2.jpg",
                        class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono text-xs"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(imagesText)]
                      ]),
                      createVNode("p", { class: "mt-2 text-xs text-gray-500" }, toDisplayString(unref(form).images.length) + " image(s) added ", 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-3 pt-6 border-t border-gray-200" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/admin/products",
                      class: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(submitting),
                      class: "inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    }, [
                      unref(submitting) ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Product"))
                    ], 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-euQfOzgx.mjs.map
