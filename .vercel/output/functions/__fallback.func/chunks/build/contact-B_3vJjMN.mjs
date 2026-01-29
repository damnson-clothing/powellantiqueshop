import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useSeoMeta } from './server.mjs';
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Contact Us - Powell's Antique Shop",
      description: "Get in touch with Powell's Antique Shop. Visit our store, call us, or send a message. We're here to help with all your vintage bag and collectibles needs.",
      ogTitle: "Contact Powell's Antique Shop",
      ogDescription: "Get in touch with our team of vintage collectibles experts"
    });
    const form = ref({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    const submitting = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}><div class="relative bg-primary-800 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"><div class="text-center"><h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"> Contact Us </h1><p class="mt-6 max-w-3xl mx-auto text-xl text-primary-100"> We&#39;d love to hear from you. Get in touch with our team. </p></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 gap-16 lg:grid-cols-2"><div><h2 class="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2><div class="space-y-8"><div class="flex items-start"><div class="flex-shrink-0"><div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div></div><div class="ml-4"><h3 class="text-lg font-medium text-gray-900">Store Location</h3><p class="mt-2 text-gray-600"> 123 Historic Avenue<br> Vintage District<br> New York, NY 10001<br> United States </p></div></div><div class="flex items-start"><div class="flex-shrink-0"><div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div><div class="ml-4"><h3 class="text-lg font-medium text-gray-900">Business Hours</h3><div class="mt-2 text-gray-600"><p>Monday - Friday: 10:00 AM - 6:00 PM</p><p>Saturday: 11:00 AM - 5:00 PM</p><p>Sunday: Closed</p></div></div></div><div class="flex items-start"><div class="flex-shrink-0"><div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div></div><div class="ml-4"><h3 class="text-lg font-medium text-gray-900">Contact Details</h3><div class="mt-2 text-gray-600 space-y-1"><p>Email: info@powellsantiques.com</p><p>Phone: (555) 123-4567</p><p>Fax: (555) 123-4568</p></div></div></div><div class="flex items-start"><div class="flex-shrink-0"><div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg></div></div><div class="ml-4"><h3 class="text-lg font-medium text-gray-900">Follow Us</h3><div class="mt-2 flex space-x-4"><a href="#" class="text-gray-400 hover:text-primary-600 transition-colors"><span class="sr-only">Facebook</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg></a><a href="#" class="text-gray-400 hover:text-primary-600 transition-colors"><span class="sr-only">Instagram</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg></a><a href="#" class="text-gray-400 hover:text-primary-600 transition-colors"><span class="sr-only">Pinterest</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.690 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.350-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"></path></svg></a></div></div></div></div></div><div class="bg-gray-50 rounded-lg p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2><form class="space-y-6"><div><label for="name" class="block text-sm font-medium text-gray-700 mb-1"> Name * </label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Email * </label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div><div><label for="phone" class="block text-sm font-medium text-gray-700 mb-1"> Phone </label><input id="phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div><div><label for="subject" class="block text-sm font-medium text-gray-700 mb-1"> Subject * </label><input id="subject"${ssrRenderAttr("value", unref(form).subject)} type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div><div><label for="message" class="block text-sm font-medium text-gray-700 mb-1"> Message * </label><textarea id="message" rows="5" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">${ssrInterpolate(unref(form).message)}</textarea></div><div><button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(unref(submitting) ? "Sending..." : "Send Message")}</button></div>`);
      if (unref(successMessage)) {
        _push(`<p class="text-green-600 text-sm">${ssrInterpolate(unref(successMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<p class="text-red-600 text-sm">${ssrInterpolate(unref(errorMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div></div><div class="bg-gray-50 py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2><div class="grid grid-cols-1 gap-8 md:grid-cols-2"><div><h3 class="text-lg font-semibold text-gray-900 mb-2">Do you authenticate all items?</h3><p class="text-gray-600"> Yes, every item in our collection is carefully authenticated by our team of experts with over 13 years of experience in vintage collectibles. </p></div><div><h3 class="text-lg font-semibold text-gray-900 mb-2">What is your return policy?</h3><p class="text-gray-600"> We offer a 14-day return policy for all items. Items must be returned in the same condition as received. Please contact us before initiating a return. </p></div><div><h3 class="text-lg font-semibold text-gray-900 mb-2">Do you ship internationally?</h3><p class="text-gray-600"> Yes, we ship worldwide. International shipping costs vary by destination. All items are carefully packaged to ensure safe delivery. </p></div><div><h3 class="text-lg font-semibold text-gray-900 mb-2">Can I visit your physical store?</h3><p class="text-gray-600"> Yes! We welcome visitors to our store by appointment. Please contact us in advance to schedule a visit and ensure availability. </p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-B_3vJjMN.mjs.map
