#pragma checksum "C:\WCS\Project\GRIEVANCES\GIT\NS GIT\IOIGrievance-Web\IOIGrieviance-Web\Views\Location\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1b82ed15ba5b3c941a17985b8163e2d494cd60c7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(IOIGrieviance_Web.Pages.Location.Views_Location_Index), @"mvc.1.0.view", @"/Views/Location/Index.cshtml")]
namespace IOIGrieviance_Web.Pages.Location
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\WCS\Project\GRIEVANCES\GIT\NS GIT\IOIGrievance-Web\IOIGrieviance-Web\Views\_ViewImports.cshtml"
using IOIGrieviance_Web;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1b82ed15ba5b3c941a17985b8163e2d494cd60c7", @"/Views/Location/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9e7062bc7c623297a92d79e2d593d74cb513dd3c", @"/Views/_ViewImports.cshtml")]
    public class Views_Location_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IOIGrieviance_Web.Models.MasterLocationModel>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("kt_modal_add_location_form"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form fv-plugins-bootstrap5 fv-plugins-framework"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("action", new global::Microsoft.AspNetCore.Html.HtmlString("#"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/Scripts/Location/Index.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "C:\WCS\Project\GRIEVANCES\GIT\NS GIT\IOIGrievance-Web\IOIGrieviance-Web\Views\Location\Index.cshtml"
  
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<!--begin::Content-->
<div class=""toolbar"" id=""kt_toolbar"">
    <!--begin::Container-->
    <div id=""kt_toolbar_container"" class=""container-fluid d-flex flex-stack"">
        <!--begin::Page title-->
        <div data-kt-swapper=""true"" data-kt-swapper-mode=""prepend"" data-kt-swapper-parent=""{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"" class=""page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"">
            <!--begin::Title-->
            <h1 class=""d-flex align-items-center text-dark fw-bolder fs-3 my-1"">Location List</h1>
            <!--end::Title-->
            <!--begin::Separator-->
            <span class=""h-20px border-gray-300 border-start mx-4""></span>
            <!--end::Separator-->
            <!--begin::Breadcrumb-->
            <ul class=""breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1"">
                <!--begin::Item-->
                <li class=""breadcrumb-item text-muted"">
                    <a href=""Home/index.html"" class=""text-mute");
            WriteLiteral(@"d text-hover-primary"">Home</a>
                </li>
                <!--end::Item-->
                <!--begin::Item-->
                <li class=""breadcrumb-item"">
                    <span class=""bullet bg-gray-300 w-5px h-2px""></span>
                </li>
                <!--end::Item-->
                <!--begin::Item-->
                <li class=""breadcrumb-item text-muted"">Master Data</li>
                <!--end::Item-->
                <!--begin::Item-->
                <li class=""breadcrumb-item"">
                    <span class=""bullet bg-gray-300 w-5px h-2px""></span>
                </li>
                <!--end::Item-->
                <!--begin::Item-->
                <li class=""breadcrumb-item text-muted"">Location List</li>
                <!--end::Item-->
            </ul>
            <!--end::Breadcrumb-->
        </div>
        <!--end::Page title-->
    </div>
    <!--end::Container-->
</div>

<!--begin dataTable::Content-->
<div class=""post d-flex flex-column-");
            WriteLiteral(@"fluid"" id=""kt_post"">
    <!--begin::Container-->
    <div id=""kt_content_container"" class=""container-xxl"">
        <!--begin::Card-->
        <div class=""card"">
            <!--begin::Card header-->
            <div class=""card-header border-0 pt-6"">
                <!--begin::Card title-->
                <div class=""card-title"">
                    <!--begin::Search-->
                    <div class=""d-flex align-items-center position-relative my-1"">
                        <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                        <span class=""svg-icon svg-icon-1 position-absolute ms-6"">
                            <svg xmlns=""http://www.w3.org/2000/svg"" width=""24"" height=""24"" viewBox=""0 0 24 24"" fill=""none"">
                                <rect opacity=""0.5"" x=""17.0365"" y=""15.1223"" width=""8.15546"" height=""2"" rx=""1"" transform=""rotate(45 17.0365 15.1223)"" fill=""black""></rect>
                                <path d=""M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55");
            WriteLiteral(@"556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"" fill=""black""></path>
                            </svg>
                        </span>
                        <!--end::Svg Icon-->
                        <input type=""text"" id=""location_filter_search"" data-kt-location-table-filter=""search"" class=""form-control form-control-solid w-250px ps-14"" placeholder=""Search User Type"">
                    </div>
                    <!--end::Search-->
                </div>
                <!--begin::Card title-->
                <!--begin::Card toolbar-->
                <div class=""card-toolbar"">
                    <!--begin::Toolbar-->
                    <div class=""d-flex justify-content-end"" data-kt-location-table-toolbar=""base"">
                        <!--begin::Export-->
                        <!--end::Export-->
                        <!--begin::Add user-->
       ");
            WriteLiteral(@"                 <button type=""button"" class=""btn btn-primary"" data-bs-toggle=""modal"" data-bs-target=""#kt_modal_add_location"">
                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
                            <span class=""svg-icon svg-icon-2"">
                                <svg xmlns=""http://www.w3.org/2000/svg"" width=""24"" height=""24"" viewBox=""0 0 24 24"" fill=""none"">
                                    <rect opacity=""0.5"" x=""11.364"" y=""20.364"" width=""16"" height=""2"" rx=""1"" transform=""rotate(-90 11.364 20.364)"" fill=""black""></rect>
                                    <rect x=""4.36396"" y=""11.364"" width=""16"" height=""2"" rx=""1"" fill=""black""></rect>
                                </svg>
                            </span>
                            <!--end::Svg Icon-->Add New
                        </button>
                        <!--end::Add user-->
                    </div>
                    <!--end::Toolbar-->
                    <!--begin::Group actions");
            WriteLiteral(@"-->
                    <!--end::Group actions-->
                    <!--begin::Modal - Adjust Balance-->
                    <!--end::Modal - New Card-->
                    <!--begin::Modal - Add task-->
                    <div class=""modal fade"" id=""kt_modal_add_location"" tabindex=""-1"" aria-hidden=""true"">
                        <!--begin::Modal dialog-->
                        <div class=""modal-dialog modal-dialog-centered mw-650px"">
                            <!--begin::Modal content-->
                            <div class=""modal-content"">
                                <!--begin::Modal header-->
                                <div class=""modal-header"" id=""kt_modal_add_location_header"">
                                    <!--begin::Modal title-->
                                    <h2 class=""fw-bolder"" id=""modal-tittle"">Add New</h2>
                                    <!--end::Modal title-->
                                    <!--begin::Close-->
                                ");
            WriteLiteral(@"    <div class=""btn btn-icon btn-sm btn-active-icon-primary"" data-kt-location-modal-action=""close"">
                                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                                        <span class=""svg-icon svg-icon-1"">
                                            <svg xmlns=""http://www.w3.org/2000/svg"" width=""24"" height=""24"" viewBox=""0 0 24 24"" fill=""none"">
                                                <rect opacity=""0.5"" x=""6"" y=""17.3137"" width=""16"" height=""2"" rx=""1"" transform=""rotate(-45 6 17.3137)"" fill=""black""></rect>
                                                <rect x=""7.41422"" y=""6"" width=""16"" height=""2"" rx=""1"" transform=""rotate(45 7.41422 6)"" fill=""black""></rect>
                                            </svg>
                                        </span>
                                        <!--end::Svg Icon-->
                                    </div>
                                    <!--end::Close-->
             ");
            WriteLiteral(@"                   </div>
                                <!--end::Modal header-->
                                <!--begin::Modal body-->
                                <div class=""modal-body scroll-y mx-5"">
                                    <!--begin::Form    mx-xl-15 my-7 -->
                                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1b82ed15ba5b3c941a17985b8163e2d494cd60c712949", async() => {
                WriteLiteral(@"
                                        <!--begin::Scroll-->
                                        <div class=""d-flex flex-column scroll-y me-n7 pe-7"" id=""kt_modal_add_location_scroll"" data-kt-scroll=""true"" data-kt-scroll-activate=""{default: false, lg: true}"" data-kt-scroll-max-height=""auto"" data-kt-scroll-dependencies=""#kt_modal_add_location_header"" data-kt-scroll-wrappers=""#kt_modal_add_location_scroll"" data-kt-scroll-offset=""300px"" style=""max-height: 164px;"">
                                            <!--begin::Input hidden-->
                                            <input type=""hidden"" name=""id"" id=""id"" />
                                            <input type=""hidden"" name=""code_header"" id=""code_header"" />
                                            <!--end::Input hidden-->
                                            <!--begin::Input group-->
                                            <div class=""fv-row mb-7 fv-plugins-icon-container"">
                                                <");
                WriteLiteral(@"!--begin::Label-->
                                                <label class=""required fw-bold fs-6 mb-2"">Location Name</label>
                                                <!--end::Label-->
                                                <!--begin::Input-->
                                                <input type=""text"" name=""name"" id=""name"" class=""form-control form-control-solid mb-3 mb-lg-0"" placeholder=""Name"">
                                                <!--end::Input-->
                                                <div class=""fv-plugins-message-container invalid-feedback""></div>
                                            </div>
                                            <!--end::Input group-->
                                        </div>
                                        <!--end::Scroll-->
                                        <!--begin::Actions-->
                                        <div class=""text-center pt-5"">
                                            <b");
                WriteLiteral(@"utton type=""reset"" class=""btn btn-light me-3"" data-kt-location-modal-action=""cancel"">Discard</button>
                                            <button type=""submit"" class=""btn btn-primary"" data-kt-location-modal-action=""submit"" id=""btn-submit"">
                                                <span class=""indicator-label"">Submit</span>
                                                <span class=""indicator-progress"">
                                                    Please wait...
                                                    <span class=""spinner-border spinner-border-sm align-middle ms-2""></span>
                                                </span>
                                            </button>
                                        </div>
                                        <!--end::Actions-->
                                        <div></div>
                                    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                                    <!--end::Form-->
                                </div>
                                <!--end::Modal body-->
                            </div>
                            <!--end::Modal content-->
                        </div>
                        <!--end::Modal dialog-->
                    </div>
                    <!--end::Modal - Add task-->
                </div>
                <!--end::Card toolbar-->
            </div>
            <!--end::Card header-->
            <!--begin::Card body-->
            <div class=""card-body py-4"">
                <!--begin::Table-->
                <div id=""kt_table_location_wrapper"" class=""dataTables_wrapper dt-bootstrap4 no-footer"">
                    <div class=""table-responsive"">
                        <table class=""table align-middle table-row-dashed fs-6 dataTable no-footer"" id=""kt_table_location"">
                            <!--begin::Table head-->
                            <thead>
         ");
            WriteLiteral("                       <!--begin::Table row-->\r\n                                <tr class=\"text-start text-muted fw-bolder fs-7 text-uppercase gs-0\">\r\n");
            WriteLiteral("                                    <th tabindex=\"0\" aria-controls=\"kt_table_trx_header\" width=\"30\">No</th>\r\n                                    <th tabindex=\"0\" aria-controls=\"kt_table_trx_header\" id=\"code_header\"");
            BeginWriteAttribute("headers", " headers=\"", 12633, "\"", 12643, 0);
            EndWriteAttribute();
            BeginWriteAttribute("class", " class=\"", 12644, "\"", 12652, 0);
            EndWriteAttribute();
            WriteLiteral(">Location Code</th>\r\n                                    <th tabindex=\"0\" aria-controls=\"kt_table_trx_header\" id=\"name\"");
            BeginWriteAttribute("headers", " headers=\"", 12772, "\"", 12782, 0);
            EndWriteAttribute();
            WriteLiteral(@" aria-sort=""ascending"" aria-label=""bussiness"" class=""min-w-125px"">Location Name</th>
                                    <th class=""min-w-100px sorting_disabled"" aria-label=""Actions"">Actions</th>
                                </tr>
                                <!--end::Table row-->
                            </thead>
                            <!--end::Table head-->
                        </table>
                    </div>

                </div>
                <!--end::Table-->
            </div>
            <!--end::Card body-->
        </div>
    </div>
</div>

<!--begin action button element-->

<div id=""default-button-action"" style=""display:none"">
    <span style=""overflow: visible; position: relative; width: 130px;"">
        <a href=""javascript:;"" class=""btn btn-icon btn-bg-light btn-light-primary btn-sm me-1"" data-toggle=""dropdown"" id=""btn-view"" onclick=""btnViewAction(this, 'view')"">
            <span class=""svg-icon svg-icon-md"">
                <svg xmlns=""http://www.");
            WriteLiteral(@"w3.org/2000/svg"" xmlns:xlink=""http://www.w3.org/1999/xlink"" width=""24px"" height=""24px"" viewBox=""0 0 24 24"" version=""1.1"" class=""svg-icon"">
                    <g stroke=""none"" stroke-width=""1"" fill=""none"" fill-rule=""evenodd"">

                        <path d=""M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z"" fill=""#000000""></path>
                        <path d=""M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z"" fill=""#000000"" opacity=""0.3""></path>
                    </g>
                </svg>
            </span>
        </a>

        <a href=""javas");
            WriteLiteral(@"cript:;"" class=""btn btn-icon btn-bg-light btn-light-success btn-sm me-1"" title=""Edit details"" id=""btn-edit"" onclick=""btnViewAction(this, 'edit')"">
            <span class=""svg-icon svg-icon-md"">
                <svg xmlns=""http://www.w3.org/2000/svg"" xmlns:xlink=""http://www.w3.org/1999/xlink"" width=""24px"" height=""24px"" viewBox=""0 0 24 24"" version=""1.1"">
                    <g stroke=""none"" stroke-width=""1"" fill=""none"" fill-rule=""evenodd"">
                        <rect x=""0"" y=""0"" width=""24"" height=""24""></rect>
                        <path d=""M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z"" fill=""#000000"" fill-rule=""nonzero"" transform=""translate(14.701953, ");
            WriteLiteral(@"10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) ""></path>
                        <path d=""M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z"" fill=""#000000"" fill-rule=""nonzero"" opacity=""0.3""></path>
                    </g>
                </svg>
            </span>
        </a>

        <a href=""javascript:;"" class=""btn btn-icon btn-bg-light btn-light-danger btn-sm me-1"" title=""Delete"" onclick=""btnDeleteAction(this)"">
            <span class=""svg-icon svg-icon-md"">
                <svg xmlns=""http://www.w3.org/2000/svg"" xmlns:xlink=""http://www.w3.org/1999/xlink"" width=""24px"" height=""24px"" viewBox=""0 0 24 24"" version=""1.1"">
                    <g s");
            WriteLiteral(@"troke=""none"" stroke-width=""1"" fill=""none"" fill-rule=""evenodd"">
                        <rect x=""0"" y=""0"" width=""24"" height=""24""></rect>
                        <path d=""M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"" fill=""#000000"" fill-rule=""nonzero""></path>
                        <path d=""M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"" fill=""#000000"" opacity=""0.3""></path>
                    </g>
                </svg>
            </span>
        </a>
    </span>
</div>
<!--end action button-->


");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1b82ed15ba5b3c941a17985b8163e2d494cd60c724757", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IOIGrieviance_Web.Models.MasterLocationModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
