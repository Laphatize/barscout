/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "__barrel_optimize__?names=HomeIcon,MapIcon,PlusCircleIcon,UserIcon!=!./node_modules/@heroicons/react/24/outline/esm/index.js":
/*!************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=HomeIcon,MapIcon,PlusCircleIcon,UserIcon!=!./node_modules/@heroicons/react/24/outline/esm/index.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HomeIcon: () => (/* reexport safe */ _HomeIcon_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   MapIcon: () => (/* reexport safe */ _MapIcon_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   PlusCircleIcon: () => (/* reexport safe */ _PlusCircleIcon_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   UserIcon: () => (/* reexport safe */ _UserIcon_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _HomeIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomeIcon.js */ \"./node_modules/@heroicons/react/24/outline/esm/HomeIcon.js\");\n/* harmony import */ var _MapIcon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapIcon.js */ \"./node_modules/@heroicons/react/24/outline/esm/MapIcon.js\");\n/* harmony import */ var _PlusCircleIcon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlusCircleIcon.js */ \"./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js\");\n/* harmony import */ var _UserIcon_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserIcon.js */ \"./node_modules/@heroicons/react/24/outline/esm/UserIcon.js\");\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX19iYXJyZWxfb3B0aW1pemVfXz9uYW1lcz1Ib21lSWNvbixNYXBJY29uLFBsdXNDaXJjbGVJY29uLFVzZXJJY29uIT0hLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDbUQ7QUFDRjtBQUNjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmFyc2NvdXQtZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lL2VzbS9pbmRleC5qcz9lMDJkIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBIb21lSWNvbiB9IGZyb20gXCIuL0hvbWVJY29uLmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFwSWNvbiB9IGZyb20gXCIuL01hcEljb24uanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQbHVzQ2lyY2xlSWNvbiB9IGZyb20gXCIuL1BsdXNDaXJjbGVJY29uLmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlckljb24gfSBmcm9tIFwiLi9Vc2VySWNvbi5qc1wiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///__barrel_optimize__?names=HomeIcon,MapIcon,PlusCircleIcon,UserIcon!=!./node_modules/@heroicons/react/24/outline/esm/index.js\n");

/***/ }),

/***/ "./components/AuthContext.js":
/*!***********************************!*\
  !*** ./components/AuthContext.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction AuthProvider({ children }) {\n    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const t = localStorage.getItem(\"token\");\n        setToken(t);\n        if (t) {\n            // Optionally decode JWT for user info\n            try {\n                const payload = JSON.parse(atob(t.split(\".\")[1]));\n                setUser({\n                    id: payload.id,\n                    role: payload.role\n                });\n            } catch  {}\n        }\n    }, []);\n    const login = (t)=>{\n        localStorage.setItem(\"token\", t);\n        setToken(t);\n        try {\n            const payload = JSON.parse(atob(t.split(\".\")[1]));\n            setUser({\n                id: payload.id,\n                role: payload.role\n            });\n        } catch  {}\n    };\n    const logout = ()=>{\n        localStorage.removeItem(\"token\");\n        setToken(null);\n        setUser(null);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            token,\n            user,\n            login,\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/AuthContext.js\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0F1dGhDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUU7QUFFdkUsTUFBTUksNEJBQWNKLG9EQUFhQTtBQUUxQixTQUFTSyxhQUFhLEVBQUVDLFFBQVEsRUFBRTtJQUN2QyxNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR04sK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDTyxNQUFNQyxRQUFRLEdBQUdSLCtDQUFRQSxDQUFDO0lBRWpDQyxnREFBU0EsQ0FBQztRQUNSLE1BQU1RLElBQUlDLGFBQWFDLE9BQU8sQ0FBQztRQUMvQkwsU0FBU0c7UUFDVCxJQUFJQSxHQUFHO1lBQ0wsc0NBQXNDO1lBQ3RDLElBQUk7Z0JBQ0YsTUFBTUcsVUFBVUMsS0FBS0MsS0FBSyxDQUFDQyxLQUFLTixFQUFFTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9DUixRQUFRO29CQUFFUyxJQUFJTCxRQUFRSyxFQUFFO29CQUFFQyxNQUFNTixRQUFRTSxJQUFJO2dCQUFDO1lBQy9DLEVBQUUsT0FBTSxDQUFDO1FBQ1g7SUFDRixHQUFHLEVBQUU7SUFFTCxNQUFNQyxRQUFRLENBQUNWO1FBQ2JDLGFBQWFVLE9BQU8sQ0FBQyxTQUFTWDtRQUM5QkgsU0FBU0c7UUFDVCxJQUFJO1lBQ0YsTUFBTUcsVUFBVUMsS0FBS0MsS0FBSyxDQUFDQyxLQUFLTixFQUFFTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0NSLFFBQVE7Z0JBQUVTLElBQUlMLFFBQVFLLEVBQUU7Z0JBQUVDLE1BQU1OLFFBQVFNLElBQUk7WUFBQztRQUMvQyxFQUFFLE9BQU0sQ0FBQztJQUNYO0lBRUEsTUFBTUcsU0FBUztRQUNiWCxhQUFhWSxVQUFVLENBQUM7UUFDeEJoQixTQUFTO1FBQ1RFLFFBQVE7SUFDVjtJQUVBLHFCQUNFLDhEQUFDTixZQUFZcUIsUUFBUTtRQUFDQyxPQUFPO1lBQUVuQjtZQUFPRTtZQUFNWTtZQUFPRTtRQUFPO2tCQUN2RGpCOzs7Ozs7QUFHUDtBQUVPLFNBQVNxQjtJQUNkLE9BQU8xQixpREFBVUEsQ0FBQ0c7QUFDcEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXJzY291dC1mcm9udGVuZC8uL2NvbXBvbmVudHMvQXV0aENvbnRleHQuanM/ZWJhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgW3Rva2VuLCBzZXRUb2tlbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgc2V0VG9rZW4odCk7XG4gICAgaWYgKHQpIHtcbiAgICAgIC8vIE9wdGlvbmFsbHkgZGVjb2RlIEpXVCBmb3IgdXNlciBpbmZvXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShhdG9iKHQuc3BsaXQoJy4nKVsxXSkpO1xuICAgICAgICBzZXRVc2VyKHsgaWQ6IHBheWxvYWQuaWQsIHJvbGU6IHBheWxvYWQucm9sZSB9KTtcbiAgICAgIH0gY2F0Y2gge31cbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBsb2dpbiA9ICh0KSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgdCk7XG4gICAgc2V0VG9rZW4odCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKGF0b2IodC5zcGxpdCgnLicpWzFdKSk7XG4gICAgICBzZXRVc2VyKHsgaWQ6IHBheWxvYWQuaWQsIHJvbGU6IHBheWxvYWQucm9sZSB9KTtcbiAgICB9IGNhdGNoIHt9XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuICAgIHNldFRva2VuKG51bGwpO1xuICAgIHNldFVzZXIobnVsbCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdG9rZW4sIHVzZXIsIGxvZ2luLCBsb2dvdXQgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUF1dGgoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInRva2VuIiwic2V0VG9rZW4iLCJ1c2VyIiwic2V0VXNlciIsInQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsImF0b2IiLCJzcGxpdCIsImlkIiwicm9sZSIsImxvZ2luIiwic2V0SXRlbSIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/AuthContext.js\n");

/***/ }),

/***/ "./components/BottomNav.js":
/*!*********************************!*\
  !*** ./components/BottomNav.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BottomNav)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_HomeIcon_MapIcon_PlusCircleIcon_UserIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=HomeIcon,MapIcon,PlusCircleIcon,UserIcon!=!@heroicons/react/24/outline */ \"__barrel_optimize__?names=HomeIcon,MapIcon,PlusCircleIcon,UserIcon!=!./node_modules/@heroicons/react/24/outline/esm/index.js\");\n\n\n\n\nconst navs = [\n    {\n        label: \"Home\",\n        href: \"/\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_HomeIcon_MapIcon_PlusCircleIcon_UserIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__.HomeIcon, {\n            className: \"h-6 w-6\"\n        }, void 0, false, {\n            fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n            lineNumber: 6,\n            columnNumber: 37\n        }, undefined)\n    },\n    {\n        label: \"Bars\",\n        href: \"/bars\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_HomeIcon_MapIcon_PlusCircleIcon_UserIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__.MapIcon, {\n            className: \"h-6 w-6\"\n        }, void 0, false, {\n            fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n            lineNumber: 7,\n            columnNumber: 41\n        }, undefined)\n    },\n    {\n        label: \"Add\",\n        href: \"/add-bar\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_HomeIcon_MapIcon_PlusCircleIcon_UserIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__.PlusCircleIcon, {\n            className: \"h-6 w-6\"\n        }, void 0, false, {\n            fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n            lineNumber: 8,\n            columnNumber: 43\n        }, undefined)\n    },\n    {\n        label: \"Profile\",\n        href: \"/settings\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_HomeIcon_MapIcon_PlusCircleIcon_UserIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__.UserIcon, {\n            className: \"h-6 w-6\"\n        }, void 0, false, {\n            fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n            lineNumber: 9,\n            columnNumber: 48\n        }, undefined)\n    }\n];\nfunction BottomNav() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 flex justify-around py-3 shadow-lg md:hidden\",\n        children: navs.map(({ label, href, icon })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: href,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: `flex flex-col items-center ${router.pathname === href ? \"text-blue-400\" : \"text-gray-400\"} hover:text-blue-300 transition-colors duration-200`,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"mb-1\",\n                            children: icon\n                        }, void 0, false, {\n                            fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n                            lineNumber: 19,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-xs font-medium\",\n                            children: label\n                        }, void 0, false, {\n                            fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n                            lineNumber: 20,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n                    lineNumber: 18,\n                    columnNumber: 11\n                }, this)\n            }, href, false, {\n                fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n                lineNumber: 17,\n                columnNumber: 9\n            }, this))\n    }, void 0, false, {\n        fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/components/BottomNav.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0JvdHRvbU5hdi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBNkI7QUFDVztBQUNrRDtBQUUxRixNQUFNTSxPQUFPO0lBQ1g7UUFBRUMsT0FBTztRQUFRQyxNQUFNO1FBQUtDLG9CQUFNLDhEQUFDUCxnSUFBUUE7WUFBQ1EsV0FBVTs7Ozs7O0lBQWE7SUFDbkU7UUFBRUgsT0FBTztRQUFRQyxNQUFNO1FBQVNDLG9CQUFNLDhEQUFDTiwrSEFBT0E7WUFBQ08sV0FBVTs7Ozs7O0lBQWE7SUFDdEU7UUFBRUgsT0FBTztRQUFPQyxNQUFNO1FBQVlDLG9CQUFNLDhEQUFDTCxzSUFBY0E7WUFBQ00sV0FBVTs7Ozs7O0lBQWE7SUFDL0U7UUFBRUgsT0FBTztRQUFXQyxNQUFNO1FBQWFDLG9CQUFNLDhEQUFDSixnSUFBUUE7WUFBQ0ssV0FBVTs7Ozs7O0lBQWE7Q0FDL0U7QUFFYyxTQUFTQztJQUN0QixNQUFNQyxTQUFTWCxzREFBU0E7SUFDeEIscUJBQ0UsOERBQUNZO1FBQUlILFdBQVU7a0JBQ1pKLEtBQUtRLEdBQUcsQ0FBQyxDQUFDLEVBQUVQLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUUsaUJBQzlCLDhEQUFDVCxrREFBSUE7Z0JBQUNRLE1BQU1BOzBCQUNWLDRFQUFDTztvQkFBSUwsV0FBVyxDQUFDLDJCQUEyQixFQUFFRSxPQUFPSSxRQUFRLEtBQUtSLE9BQU8sa0JBQWtCLGdCQUFnQixtREFBbUQsQ0FBQzs7c0NBQzdKLDhEQUFDTzs0QkFBSUwsV0FBVTtzQ0FBUUQ7Ozs7OztzQ0FDdkIsOERBQUNROzRCQUFLUCxXQUFVO3NDQUF1Qkg7Ozs7Ozs7Ozs7OztlQUhwQkM7Ozs7Ozs7Ozs7QUFTL0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXJzY291dC1mcm9udGVuZC8uL2NvbXBvbmVudHMvQm90dG9tTmF2LmpzP2ZiYzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IEhvbWVJY29uLCBNYXBJY29uLCBQbHVzQ2lyY2xlSWNvbiwgVXNlckljb24gfSBmcm9tICdAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmUnO1xuXG5jb25zdCBuYXZzID0gW1xuICB7IGxhYmVsOiAnSG9tZScsIGhyZWY6ICcvJywgaWNvbjogPEhvbWVJY29uIGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPiB9LFxuICB7IGxhYmVsOiAnQmFycycsIGhyZWY6ICcvYmFycycsIGljb246IDxNYXBJY29uIGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPiB9LFxuICB7IGxhYmVsOiAnQWRkJywgaHJlZjogJy9hZGQtYmFyJywgaWNvbjogPFBsdXNDaXJjbGVJY29uIGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPiB9LFxuICB7IGxhYmVsOiAnUHJvZmlsZScsIGhyZWY6ICcvc2V0dGluZ3MnLCBpY29uOiA8VXNlckljb24gY2xhc3NOYW1lPVwiaC02IHctNlwiIC8+IH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCb3R0b21OYXYoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgei01MCBiZy1ncmF5LTkwMCBib3JkZXItdCBib3JkZXItZ3JheS04MDAgZmxleCBqdXN0aWZ5LWFyb3VuZCBweS0zIHNoYWRvdy1sZyBtZDpoaWRkZW5cIj5cbiAgICAgIHtuYXZzLm1hcCgoeyBsYWJlbCwgaHJlZiwgaWNvbiB9KSA9PiAoXG4gICAgICAgIDxMaW5rIGhyZWY9e2hyZWZ9IGtleT17aHJlZn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciAke3JvdXRlci5wYXRobmFtZSA9PT0gaHJlZiA/ICd0ZXh0LWJsdWUtNDAwJyA6ICd0ZXh0LWdyYXktNDAwJ30gaG92ZXI6dGV4dC1ibHVlLTMwMCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDBgfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMVwiPntpY29ufTwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bVwiPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICkpfVxuICAgIDwvbmF2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkxpbmsiLCJ1c2VSb3V0ZXIiLCJIb21lSWNvbiIsIk1hcEljb24iLCJQbHVzQ2lyY2xlSWNvbiIsIlVzZXJJY29uIiwibmF2cyIsImxhYmVsIiwiaHJlZiIsImljb24iLCJjbGFzc05hbWUiLCJCb3R0b21OYXYiLCJyb3V0ZXIiLCJuYXYiLCJtYXAiLCJkaXYiLCJwYXRobmFtZSIsInNwYW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/BottomNav.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/AuthContext */ \"./components/AuthContext.js\");\n/* harmony import */ var _components_BottomNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/BottomNav */ \"./components/BottomNav.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        if (false) {}\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/pages/_app.js\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BottomNav__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/pages/_app.js\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/pranav/Downloads/barscout_complete/frontend/pages/_app.js\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDMkI7QUFDVDtBQUNkO0FBRW5CLFNBQVNHLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbERILGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxLQUFrQixFQUFhLEVBRWxDO0lBQ0gsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNGLGlFQUFZQTs7MEJBQ1gsOERBQUNJO2dCQUFXLEdBQUdDLFNBQVM7Ozs7OzswQkFDeEIsOERBQUNKLDZEQUFTQTs7Ozs7Ozs7Ozs7QUFHaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXJzY291dC1mcm9udGVuZC8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvQXV0aENvbnRleHQnO1xuaW1wb3J0IEJvdHRvbU5hdiBmcm9tICcuLi9jb21wb25lbnRzL0JvdHRvbU5hdic7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPEJvdHRvbU5hdiAvPlxuICAgIDwvQXV0aFByb3ZpZGVyPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkF1dGhQcm92aWRlciIsIkJvdHRvbU5hdiIsInVzZUVmZmVjdCIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@heroicons"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();