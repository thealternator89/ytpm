(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * The content below * * * * * * * * * * * -->\n<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->\n<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * Delete the template below * * * * * * * * * * -->\n<!-- * * * * * * * to get started with your project! * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * The content above * * * * * * * * * * * -->\n<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->\n<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * * End of Placeholder * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n\n<router-outlet>\n\n</router-outlet>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/add/add.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/add/add.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card>\n  <div class=\"card-heading\">Add to Queue</div>\n  <mat-card-actions>\n    <button mat-flat-button (click)=\"clickSearch()\"><mat-icon>search</mat-icon><br>Search</button>\n    <button mat-flat-button (click)=\"clickFeatured()\"><mat-icon>featured_play_list</mat-icon><br>Featured</button>\n    <button mat-flat-button (click)=\"clickManual()\"><mat-icon>add_to_queue</mat-icon><br>Manual</button>\n  </mat-card-actions>\n</mat-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/nowplaying/nowplaying.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/nowplaying/nowplaying.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card>\n  <div class=\"card-heading\">Now Playing</div>\n  <div *ngIf=\"!isValid()\" id=\"content\">\n    <mat-card-title>Nothing Playing</mat-card-title>\n    <mat-card-subtitle>Add a song to the queue</mat-card-subtitle>\n  </div>\n  <div *ngIf=\"isValid()\" id=\"content\">\n    <mat-card-title>{{nowPlaying.title}}</mat-card-title>\n    <mat-card-subtitle>{{nowPlaying.channelName}}</mat-card-subtitle>\n  </div>\n  <mat-card-actions *ngIf=\"isValid()\">\n    <button mat-icon-button (click)=\"replayClick()\"><mat-icon>replay</mat-icon></button>\n    <button mat-mini-fab (click)=\"playPauseClick()\"><mat-icon>{{status === \"PLAYING\" ? \"pause\" : \"play_arrow\"}}</mat-icon></button>\n    <button mat-icon-button (click)=\"skipClick()\"><mat-icon>skip_next</mat-icon></button>\n  </mat-card-actions>\n  <div *ngIf=\"isValid()\" id=\"overlay\"></div>\n  <img *ngIf=\"isValid()\" id=\"coverimage\" [src]=\"nowPlaying.thumbnail?.big || ''\">\n</mat-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/playerdetails/playerdetails.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/playerdetails/playerdetails.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"playerdetails\">\n  Connected to player: <strong>{{playerCode}}</strong><br>\n  <a href=\"javascript:void\" (click)=\"showLoginQrCode()\">Show QR Code</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:void\" (click)=\"logOut()\">Log out</a>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/upnext/upnext.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/upnext/upnext.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-card>\n  <div class=\"card-heading\">Up Next</div>\n  <div *ngIf=\"isValid()\">\n    <mat-card-title>{{upNext.title}}<span id=\"auto\" *ngIf=\"upNext.auto\">auto</span></mat-card-title>\n    <mat-card-subtitle>{{upNext.channelName}}</mat-card-subtitle>\n  </div>\n  <div *ngIf=\"!isValid()\">\n    <mat-card-title>Nothing up next</mat-card-title>\n  </div>\n  <mat-card-actions>\n    <button mat-flat-button (click)=\"clickQueue()\"><mat-icon [matBadge]=\"queueLengthBadgeContent()\" [matBadgeColor]=\"queueLengthBadgeColor()\">queue_music</mat-icon><br>Queue</button>\n    <button mat-flat-button (click)=\"clickHistory()\"><mat-icon>history</mat-icon><br>History</button>\n  </mat-card-actions>\n</mat-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/util/list-item/list-item.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/util/list-item/list-item.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>list-item works!</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/home/manual-add/manual-add.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/home/manual-add/manual-add.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 mat-dialog-title>Manually Add <button id=\"close\" mat-icon-button mat-dialog-close><mat-icon>close</mat-icon></button></h1>\n\n<form>\n    <mat-button-toggle-group #group=\"matButtonToggleGroup\" name=\"type\" value=\"url\">\n        <mat-button-toggle value=\"url\">YouTube URL</mat-button-toggle>\n        <mat-button-toggle value=\"id\">Video ID</mat-button-toggle>\n    </mat-button-toggle-group>\n    <mat-form-field>\n        <input matInput #inputText [placeholder]=\"group.value == 'url' ? 'URL' : 'Video ID'\">\n    </mat-form-field>\n</form>\n<mat-dialog-actions>\n    <button mat-button mat-dialog-close (click)=\"clickAddToQueue(inputText.value)\">Add to Queue</button>\n    <button mat-button mat-dialog-close (click)=\"clickPlayNext(inputText.value)\">Play Next</button>\n</mat-dialog-actions>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/home/player-qr/player-qr.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/home/player-qr/player-qr.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<img [src]=\"qrCodeUrl\" [alt]=\"loginCode\" width=\"200\" height=\"200\">\n<div id=\"footerbutton\">\n  <button mat-button (click)=\"onCloseClick()\" aria-label=\"Close dialog\"><mat-icon>close</mat-icon></button>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/search/add-options/add-options.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/search/add-options/add-options.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\n    <button mat-button mat-dialog-close (click)=\"clickAddToQueue()\"><mat-icon>add_to_queue</mat-icon><br>Add to Queue</button>\n    <button mat-button mat-dialog-close (click)=\"clickPlayNext()\"><mat-icon>queue_play_next</mat-icon><br>Play Next</button>\n</div>\n<div style=\"text-align: center; margin-top: 20px;\">\n    <button mat-button mat-dialog-close>Cancel</button>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/helper/authcheck/authcheck.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/helper/authcheck/authcheck.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/connect-player/connect-player.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page/connect-player/connect-player.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div id=\"logo-container\">\n    <span id=\"logo\">YTPM</span>\n</div>\n\n<p id=\"heading\">Connect to a Player</p>\n\n<div style=\"text-align: center;\">\n    <mat-form-field appearance=\"fill\">\n        <mat-label>Code on TV</mat-label>\n        <input #key id=\"keyInput\" matInput placeholder=\"ABC23\" required minlength=\"5\" maxlength=\"5\" autocomplete=\"off\" [value]=\"playerKey\">\n        <mat-icon matSuffix>tv</mat-icon>\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\">\n        <mat-label>Your Name</mat-label>\n        <input #name matInput required>\n        <mat-icon matSuffix>person</mat-icon>\n    </mat-form-field>\n    <button mat-raised-button (click)=\"signIn(name.value, key.value)\">Connect</button>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/featured-menu/featured-menu.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page/featured-menu/featured-menu.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar>\n  <button mat-icon-button (click)=\"homeButton()\"><mat-icon>home</mat-icon></button>\n  Featured\n</mat-toolbar>\n<mat-tab-group>\n  <mat-tab label=\"Channels\">\n      <mat-action-list>\n        <mat-list-item *ngFor=\"let channel of channels\">\n          <img matListAvatar [src]=\"channel.thumbnail\" alt=\"Cover\">\n          <h3 class=\"name\" matLine>{{channel.name}}</h3>\n        </mat-list-item>\n      </mat-action-list>\n  </mat-tab>\n  <mat-tab label=\"Lists\">\n      <mat-action-list>\n        <mat-list-item *ngFor=\"let list of lists\">\n          <img matListAvatar [src]=\"list.thumbnail\" alt=\"Cover\">\n          <h3 class=\"name\" matLine>{{list.name}}</h3>\n          <p class=\"channel\" matLine>{{list.channel}}</p>\n        </mat-list-item>\n      </mat-action-list>\n    </mat-tab>\n</mat-tab-group>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/history/history.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page/history/history.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar>\n    <button mat-icon-button (click)=\"homeButton()\"><mat-icon>home</mat-icon></button>\n    History\n</mat-toolbar>\n<mat-action-list>\n    <mat-list-item *ngFor=\"let item of historyItems\">\n        <img class=\"thumbnail\" matListAvatar [src]=\"item.thumbnail.normal\" height=\"50\">\n        <h3 id=\"name\" matLine>{{item.title}}</h3>\n        <p id=\"channel\" matLine>{{item.channelName}}</p>\n    </mat-list-item>\n</mat-action-list>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/home/home.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page/home/home.component.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-home-nowplaying [nowPlaying]=\"status.playingNow\" [status]=\"status.playerStatus\"></app-home-nowplaying>\n<app-home-upnext [upNext]=\"status.upNext\" [queueLength]=\"status.queueLength\"></app-home-upnext>\n<app-home-add></app-home-add>\n<app-home-playerdetails [playerCode]=\"status.playerCode\"></app-home-playerdetails>\n<div id=\"powered_by\">\n  Powered by <span id=\"logo\">YTPM</span>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/queue/queue.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page/queue/queue.component.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar>\n    <button mat-icon-button (click)=\"homeButton()\"><mat-icon>home</mat-icon></button>\n    Queue\n</mat-toolbar>\n<mat-action-list *ngIf=\"state\">\n    <mat-list-item *ngFor=\"let item of state.queue\">\n        <img class=\"thumbnail\" matListAvatar [src]=\"item.thumbnail.normal\" height=\"50\">\n        <h3 id=\"name\" matLine>{{item.title}}</h3>\n        <p id=\"channel\" matLine>{{item.channelName}}</p>\n    </mat-list-item>\n</mat-action-list>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/search/search.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page/search/search.component.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar>\n  <mat-toolbar-row>\n    <button mat-icon-button (click)=\"homeButton()\"><mat-icon>home</mat-icon></button>\n    Search\n  </mat-toolbar-row>\n  <mat-toolbar-row>\n    <form (ngSubmit)=\"onFormSubmit(searchBox.value, $event)\">\n      <mat-form-field>\n        <input #searchBox matInput (input)=\"onSearchChange($event.target.value)\">\n      </mat-form-field>\n      <button id=\"searchBtn\" mat-icon-button><mat-icon>search</mat-icon></button>\n    </form>\n  </mat-toolbar-row>\n</mat-toolbar>\n<mat-action-list #autoCompleteList *ngIf=\"searchResults.length === 0\">\n  <mat-list-item *ngFor=\"let suggestion of autoComplete\" (click)=\"search(suggestion)\">\n    <p matLLine>{{suggestion}}</p>\n  </mat-list-item>\n</mat-action-list>\n<mat-action-list #searchResultList *ngIf=\"searchResults.length !== 0\">\n    <mat-list-item *ngFor=\"let result of searchResults\" (click)=\"add(result.videoId)\">\n      <img class=\"thumbnail\" matListAvatar [src]=\"result.thumbnail.normal\" height=\"50\">\n      <h3 id=\"name\" matLine>{{result.title}}</h3>\n      <p id=\"channel\" matLine>{{result.channelName}}</p>\n    </mat-list-item>\n</mat-action-list>\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _page_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page/home/home.component */ "./src/app/page/home/home.component.ts");
/* harmony import */ var _page_search_search_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page/search/search.component */ "./src/app/page/search/search.component.ts");
/* harmony import */ var _page_featured_menu_featured_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page/featured-menu/featured-menu.component */ "./src/app/page/featured-menu/featured-menu.component.ts");
/* harmony import */ var _page_queue_queue_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page/queue/queue.component */ "./src/app/page/queue/queue.component.ts");
/* harmony import */ var _page_history_history_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./page/history/history.component */ "./src/app/page/history/history.component.ts");
/* harmony import */ var _helper_authcheck_authcheck_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helper/authcheck/authcheck.component */ "./src/app/helper/authcheck/authcheck.component.ts");
/* harmony import */ var _page_connect_player_connect_player_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./page/connect-player/connect-player.component */ "./src/app/page/connect-player/connect-player.component.ts");










const routes = [
    { path: '', pathMatch: 'full', component: _helper_authcheck_authcheck_component__WEBPACK_IMPORTED_MODULE_8__["AuthcheckComponent"] },
    { path: 'connect', component: _page_connect_player_connect_player_component__WEBPACK_IMPORTED_MODULE_9__["ConnectPlayerComponent"] },
    { path: 'home', component: _page_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: 'search', component: _page_search_search_component__WEBPACK_IMPORTED_MODULE_4__["SearchComponent"] },
    { path: 'featured', component: _page_featured_menu_featured_menu_component__WEBPACK_IMPORTED_MODULE_5__["FeaturedMenuComponent"] },
    { path: 'queue', component: _page_queue_queue_component__WEBPACK_IMPORTED_MODULE_6__["QueueComponent"] },
    { path: 'history', component: _page_history_history_component__WEBPACK_IMPORTED_MODULE_7__["HistoryComponent"] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'partymode-sandbox2-ng';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/esm2015/badge.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm2015/button-toggle.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm2015/card.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm2015/list.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm2015/snack-bar.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm2015/tabs.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm2015/toolbar.js");
/* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-webstorage-service */ "./node_modules/ngx-webstorage-service/fesm2015/ngx-webstorage-service.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _page_home_home_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./page/home/home.component */ "./src/app/page/home/home.component.ts");
/* harmony import */ var _component_home_nowplaying_nowplaying_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./component/home/nowplaying/nowplaying.component */ "./src/app/component/home/nowplaying/nowplaying.component.ts");
/* harmony import */ var _component_home_upnext_upnext_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./component/home/upnext/upnext.component */ "./src/app/component/home/upnext/upnext.component.ts");
/* harmony import */ var _component_home_add_add_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./component/home/add/add.component */ "./src/app/component/home/add/add.component.ts");
/* harmony import */ var _dialog_home_manual_add_manual_add_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dialog/home/manual-add/manual-add.component */ "./src/app/dialog/home/manual-add/manual-add.component.ts");
/* harmony import */ var _page_search_search_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./page/search/search.component */ "./src/app/page/search/search.component.ts");
/* harmony import */ var _dialog_home_player_qr_player_qr_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./dialog/home/player-qr/player-qr.component */ "./src/app/dialog/home/player-qr/player-qr.component.ts");
/* harmony import */ var _component_home_playerdetails_playerdetails_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./component/home/playerdetails/playerdetails.component */ "./src/app/component/home/playerdetails/playerdetails.component.ts");
/* harmony import */ var _page_featured_menu_featured_menu_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./page/featured-menu/featured-menu.component */ "./src/app/page/featured-menu/featured-menu.component.ts");
/* harmony import */ var _component_util_list_item_list_item_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./component/util/list-item/list-item.component */ "./src/app/component/util/list-item/list-item.component.ts");
/* harmony import */ var _page_queue_queue_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./page/queue/queue.component */ "./src/app/page/queue/queue.component.ts");
/* harmony import */ var _page_history_history_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./page/history/history.component */ "./src/app/page/history/history.component.ts");
/* harmony import */ var _helper_authcheck_authcheck_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./helper/authcheck/authcheck.component */ "./src/app/helper/authcheck/authcheck.component.ts");
/* harmony import */ var _page_connect_player_connect_player_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./page/connect-player/connect-player.component */ "./src/app/page/connect-player/connect-player.component.ts");
/* harmony import */ var _dialog_search_add_options_add_options_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./dialog/search/add-options/add-options.component */ "./src/app/dialog/search/add-options/add-options.component.ts");



































let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"],
            _page_home_home_component__WEBPACK_IMPORTED_MODULE_20__["HomeComponent"],
            _component_home_nowplaying_nowplaying_component__WEBPACK_IMPORTED_MODULE_21__["NowplayingComponent"],
            _component_home_upnext_upnext_component__WEBPACK_IMPORTED_MODULE_22__["UpnextComponent"],
            _component_home_add_add_component__WEBPACK_IMPORTED_MODULE_23__["AddComponent"],
            _dialog_home_manual_add_manual_add_component__WEBPACK_IMPORTED_MODULE_24__["ManualAddComponent"],
            _page_search_search_component__WEBPACK_IMPORTED_MODULE_25__["SearchComponent"],
            _dialog_home_player_qr_player_qr_component__WEBPACK_IMPORTED_MODULE_26__["PlayerQrComponent"],
            _component_home_playerdetails_playerdetails_component__WEBPACK_IMPORTED_MODULE_27__["PlayerdetailsComponent"],
            _page_featured_menu_featured_menu_component__WEBPACK_IMPORTED_MODULE_28__["FeaturedMenuComponent"],
            _component_util_list_item_list_item_component__WEBPACK_IMPORTED_MODULE_29__["ListItemComponent"],
            _page_queue_queue_component__WEBPACK_IMPORTED_MODULE_30__["QueueComponent"],
            _page_history_history_component__WEBPACK_IMPORTED_MODULE_31__["HistoryComponent"],
            _helper_authcheck_authcheck_component__WEBPACK_IMPORTED_MODULE_32__["AuthcheckComponent"],
            _page_connect_player_connect_player_component__WEBPACK_IMPORTED_MODULE_33__["ConnectPlayerComponent"],
            _dialog_search_add_options_add_options_component__WEBPACK_IMPORTED_MODULE_34__["AddOptionsComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_17__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_5__["MatBadgeModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_8__["MatCardModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_14__["MatTabsModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__["MatToolbarModule"],
            ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_16__["StorageServiceModule"],
        ],
        entryComponents: [
            _dialog_search_add_options_add_options_component__WEBPACK_IMPORTED_MODULE_34__["AddOptionsComponent"],
            _dialog_home_manual_add_manual_add_component__WEBPACK_IMPORTED_MODULE_24__["ManualAddComponent"],
            _dialog_home_player_qr_player_qr_component__WEBPACK_IMPORTED_MODULE_26__["PlayerQrComponent"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/component/home/add/add.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/component/home/add/add.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("button {\n  width: 33%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2hvbWUvYWRkL0M6XFxVc2Vyc1xcbWRiZW5cXERldmVsb3BtZW50XFxzYW5kYm94XFxwYXJ0eW1vZGUtc2FuZGJveDItbmcvc3JjXFxhcHBcXGNvbXBvbmVudFxcaG9tZVxcYWRkXFxhZGQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC9ob21lL2FkZC9hZGQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvaG9tZS9hZGQvYWRkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uIHtcbiAgd2lkdGg6IDMzJTtcbn1cbiIsImJ1dHRvbiB7XG4gIHdpZHRoOiAzMyU7XG59Il19 */");

/***/ }),

/***/ "./src/app/component/home/add/add.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/component/home/add/add.component.ts ***!
  \*****************************************************/
/*! exports provided: AddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddComponent", function() { return AddComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var src_app_dialog_home_manual_add_manual_add_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dialog/home/manual-add/manual-add.component */ "./src/app/dialog/home/manual-add/manual-add.component.ts");





let AddComponent = class AddComponent {
    constructor(dialog, router) {
        this.dialog = dialog;
        this.router = router;
    }
    ngOnInit() {
    }
    clickManual() {
        this.dialog.open(src_app_dialog_home_manual_add_manual_add_component__WEBPACK_IMPORTED_MODULE_4__["ManualAddComponent"], {
            height: '280px',
            width: '300px',
        });
    }
    clickSearch() {
        this.router.navigateByUrl('/search');
    }
    clickFeatured() {
        this.router.navigateByUrl('/featured');
    }
};
AddComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AddComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home-add',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./add.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/add/add.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./add.component.scss */ "./src/app/component/home/add/add.component.scss")).default]
    })
], AddComponent);



/***/ }),

/***/ "./src/app/component/home/nowplaying/nowplaying.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/component/home/nowplaying/nowplaying.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#coverimage {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: auto;\n}\n\n#overlay {\n  position: absolute;\n  z-index: 1;\n  background-color: rgba(0, 0, 0, 0.6);\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n\n#content {\n  position: absolute;\n  z-index: 2;\n  top: 0px;\n  left: 0px;\n  width: 90%;\n  height: 100%;\n  padding: 20px 10px 10px 10px;\n}\n\nmat-card {\n  padding-top: 50%;\n}\n\nmat-card-title, mat-card-subtitle {\n  z-index: 100;\n}\n\nbutton {\n  z-index: 50;\n}\n\nmat-card-actions {\n  position: absolute;\n  bottom: 0px;\n  width: 100%;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2hvbWUvbm93cGxheWluZy9DOlxcVXNlcnNcXG1kYmVuXFxEZXZlbG9wbWVudFxcc2FuZGJveFxccGFydHltb2RlLXNhbmRib3gyLW5nL3NyY1xcYXBwXFxjb21wb25lbnRcXGhvbWVcXG5vd3BsYXlpbmdcXG5vd3BsYXlpbmcuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC9ob21lL25vd3BsYXlpbmcvbm93cGxheWluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0NGOztBREdBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0Esb0NBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0FDQUY7O0FER0E7RUFDRSxZQUFBO0FDQUY7O0FER0E7RUFDRSxXQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9ob21lL25vd3BsYXlpbmcvbm93cGxheWluZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb3ZlcmltYWdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDBweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICAvLyBvcGFjaXR5OiAwLjQ7XG59XG5cbiNvdmVybGF5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuNik7XG4gIHRvcDogMHB4O1xuICBsZWZ0OiAwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiNjb250ZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xuICB0b3A6IDBweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogOTAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDIwcHggMTBweCAxMHB4IDEwcHg7XG59XG5cbm1hdC1jYXJkIHtcbiAgcGFkZGluZy10b3A6IDUwJTtcbn1cblxubWF0LWNhcmQtdGl0bGUsIG1hdC1jYXJkLXN1YnRpdGxlIHtcbiAgei1pbmRleDogMTAwO1xufVxuXG5idXR0b24ge1xuICB6LWluZGV4OiA1MDtcbn1cblxubWF0LWNhcmQtYWN0aW9ucyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iLCIjY292ZXJpbWFnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG4gIGxlZnQ6IDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cblxuI292ZXJsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDE7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgdG9wOiAwcHg7XG4gIGxlZnQ6IDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuI2NvbnRlbnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDI7XG4gIHRvcDogMHB4O1xuICBsZWZ0OiAwcHg7XG4gIHdpZHRoOiA5MCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMjBweCAxMHB4IDEwcHggMTBweDtcbn1cblxubWF0LWNhcmQge1xuICBwYWRkaW5nLXRvcDogNTAlO1xufVxuXG5tYXQtY2FyZC10aXRsZSwgbWF0LWNhcmQtc3VidGl0bGUge1xuICB6LWluZGV4OiAxMDA7XG59XG5cbmJ1dHRvbiB7XG4gIHotaW5kZXg6IDUwO1xufVxuXG5tYXQtY2FyZC1hY3Rpb25zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/component/home/nowplaying/nowplaying.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/component/home/nowplaying/nowplaying.component.ts ***!
  \*******************************************************************/
/*! exports provided: NowplayingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NowplayingComponent", function() { return NowplayingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");



let NowplayingComponent = class NowplayingComponent {
    constructor(ytpmService) {
        this.ytpmService = ytpmService;
    }
    isValid() {
        return !!this.nowPlaying.title && !!this.nowPlaying.channelName;
    }
    replayClick() {
        this.ytpmService.sendCommand('REPLAYTRACK');
    }
    playPauseClick() {
        if (this.status === 'PLAYING') {
            this.ytpmService.sendCommand('PAUSE');
        }
        else {
            this.ytpmService.sendCommand('PLAY');
        }
    }
    skipClick() {
        this.ytpmService.sendCommand('NEXTTRACK');
    }
};
NowplayingComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], NowplayingComponent.prototype, "nowPlaying", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], NowplayingComponent.prototype, "status", void 0);
NowplayingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home-nowplaying',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./nowplaying.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/nowplaying/nowplaying.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./nowplaying.component.scss */ "./src/app/component/home/nowplaying/nowplaying.component.scss")).default]
    })
], NowplayingComponent);



/***/ }),

/***/ "./src/app/component/home/playerdetails/playerdetails.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/component/home/playerdetails/playerdetails.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#playerdetails {\n  text-align: center;\n  color: #aaa;\n}\n\na {\n  color: #aaa;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2hvbWUvcGxheWVyZGV0YWlscy9DOlxcVXNlcnNcXG1kYmVuXFxEZXZlbG9wbWVudFxcc2FuZGJveFxccGFydHltb2RlLXNhbmRib3gyLW5nL3NyY1xcYXBwXFxjb21wb25lbnRcXGhvbWVcXHBsYXllcmRldGFpbHNcXHBsYXllcmRldGFpbHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC9ob21lL3BsYXllcmRldGFpbHMvcGxheWVyZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2hvbWUvcGxheWVyZGV0YWlscy9wbGF5ZXJkZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3BsYXllcmRldGFpbHMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjYWFhO1xufVxuXG5hIHtcbiAgY29sb3I6ICNhYWE7XG59XG4iLCIjcGxheWVyZGV0YWlscyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICNhYWE7XG59XG5cbmEge1xuICBjb2xvcjogI2FhYTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/component/home/playerdetails/playerdetails.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/component/home/playerdetails/playerdetails.component.ts ***!
  \*************************************************************************/
/*! exports provided: PlayerdetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerdetailsComponent", function() { return PlayerdetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var src_app_dialog_home_player_qr_player_qr_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dialog/home/player-qr/player-qr.component */ "./src/app/dialog/home/player-qr/player-qr.component.ts");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let PlayerdetailsComponent = class PlayerdetailsComponent {
    constructor(dialog, ytpmService, router) {
        this.dialog = dialog;
        this.ytpmService = ytpmService;
        this.router = router;
    }
    showLoginQrCode() {
        this.dialog.open(src_app_dialog_home_player_qr_player_qr_component__WEBPACK_IMPORTED_MODULE_3__["PlayerQrComponent"], {
            height: '300px',
            width: '250px',
            data: {
                code: this.playerCode
            }
        });
    }
    logOut() {
        this.ytpmService.deauth();
        this.router.navigateByUrl('/login');
    }
};
PlayerdetailsComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_4__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PlayerdetailsComponent.prototype, "playerCode", void 0);
PlayerdetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home-playerdetails',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./playerdetails.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/playerdetails/playerdetails.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./playerdetails.component.scss */ "./src/app/component/home/playerdetails/playerdetails.component.scss")).default]
    })
], PlayerdetailsComponent);



/***/ }),

/***/ "./src/app/component/home/upnext/upnext.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/component/home/upnext/upnext.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("button {\n  width: 50%;\n}\n\nmat-card {\n  padding-top: 25px;\n}\n\nmat-card-title {\n  font-size: 14pt;\n}\n\nmat-card-subtitle {\n  font-size: 10pt;\n}\n\n#auto {\n  font-size: 10px;\n  background-color: #69f0ae;\n  color: black;\n  border-radius: 2px;\n  margin-left: 5px;\n  padding: 2px 4px 4px;\n  vertical-align: 20%;\n  text-transform: uppercase;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2hvbWUvdXBuZXh0L0M6XFxVc2Vyc1xcbWRiZW5cXERldmVsb3BtZW50XFxzYW5kYm94XFxwYXJ0eW1vZGUtc2FuZGJveDItbmcvc3JjXFxhcHBcXGNvbXBvbmVudFxcaG9tZVxcdXBuZXh0XFx1cG5leHQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC9ob21lL3VwbmV4dC91cG5leHQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9ob21lL3VwbmV4dC91cG5leHQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b24ge1xuICB3aWR0aDogNTAlO1xufVxuXG5tYXQtY2FyZCB7XG4gIHBhZGRpbmctdG9wOiAyNXB4O1xufVxuXG5tYXQtY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRwdDtcbn1cblxubWF0LWNhcmQtc3VidGl0bGUge1xuICBmb250LXNpemU6IDEwcHQ7XG59XG5cbiNhdXRvIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjlmMGFlO1xuICBjb2xvcjogYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgcGFkZGluZzogMnB4IDRweCA0cHg7XG4gIHZlcnRpY2FsLWFsaWduOiAyMCU7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59IiwiYnV0dG9uIHtcbiAgd2lkdGg6IDUwJTtcbn1cblxubWF0LWNhcmQge1xuICBwYWRkaW5nLXRvcDogMjVweDtcbn1cblxubWF0LWNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDE0cHQ7XG59XG5cbm1hdC1jYXJkLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMHB0O1xufVxuXG4jYXV0byB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY5ZjBhZTtcbiAgY29sb3I6IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIHBhZGRpbmc6IDJweCA0cHggNHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogMjAlO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/component/home/upnext/upnext.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/component/home/upnext/upnext.component.ts ***!
  \***********************************************************/
/*! exports provided: UpnextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpnextComponent", function() { return UpnextComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let UpnextComponent = class UpnextComponent {
    constructor(router) {
        this.router = router;
    }
    clickQueue() {
        this.router.navigateByUrl('/queue');
    }
    clickHistory() {
        this.router.navigateByUrl('/history');
    }
    queueLengthBadgeContent() {
        if (this.queueLength < 100) {
            return `${this.queueLength}`;
        }
        else if (this.queueLength > 100) {
            return '😁';
        }
        else {
            return '😖';
        }
    }
    queueLengthBadgeColor() {
        if (this.queueLength >= 10) {
            return 'primary';
        }
        else if (this.queueLength > 1) {
            return 'accent';
        }
        else {
            return 'warn';
        }
    }
    isValid() {
        return !!this.upNext.title && !!this.upNext.channelName;
    }
};
UpnextComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UpnextComponent.prototype, "upNext", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UpnextComponent.prototype, "queueLength", void 0);
UpnextComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home-upnext',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./upnext.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/home/upnext/upnext.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./upnext.component.scss */ "./src/app/component/home/upnext/upnext.component.scss")).default]
    })
], UpnextComponent);



/***/ }),

/***/ "./src/app/component/util/list-item/list-item.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/component/util/list-item/list-item.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC91dGlsL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/component/util/list-item/list-item.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/component/util/list-item/list-item.component.ts ***!
  \*****************************************************************/
/*! exports provided: ListItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemComponent", function() { return ListItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ListItemComponent = class ListItemComponent {
    constructor() { }
    ngOnInit() {
    }
};
ListItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-list-item',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./list-item.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/util/list-item/list-item.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./list-item.component.scss */ "./src/app/component/util/list-item/list-item.component.scss")).default]
    })
], ListItemComponent);



/***/ }),

/***/ "./src/app/dialog/home/manual-add/manual-add.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/dialog/home/manual-add/manual-add.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  width: 100%;\n  margin-top: 10px;\n}\n\nmat-button-toggle-group {\n  width: 100%;\n}\n\nmat-button-toggle {\n  width: 50%;\n}\n\n#close {\n  float: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9nL2hvbWUvbWFudWFsLWFkZC9DOlxcVXNlcnNcXG1kYmVuXFxEZXZlbG9wbWVudFxcc2FuZGJveFxccGFydHltb2RlLXNhbmRib3gyLW5nL3NyY1xcYXBwXFxkaWFsb2dcXGhvbWVcXG1hbnVhbC1hZGRcXG1hbnVhbC1hZGQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2RpYWxvZy9ob21lL21hbnVhbC1hZGQvbWFudWFsLWFkZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksVUFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9nL2hvbWUvbWFudWFsLWFkZC9tYW51YWwtYWRkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWZvcm0tZmllbGQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxubWF0LWJ1dHRvbi10b2dnbGUge1xyXG4gICAgd2lkdGg6IDUwJTtcclxufVxyXG5cclxuI2Nsb3NlIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxufSIsIm1hdC1mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1hdC1idXR0b24tdG9nZ2xlIHtcbiAgd2lkdGg6IDUwJTtcbn1cblxuI2Nsb3NlIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/dialog/home/manual-add/manual-add.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/dialog/home/manual-add/manual-add.component.ts ***!
  \****************************************************************/
/*! exports provided: ManualAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualAddComponent", function() { return ManualAddComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm2015/snack-bar.js");




let ManualAddComponent = class ManualAddComponent {
    constructor(ytpmService, _snackBar) {
        this.ytpmService = ytpmService;
        this._snackBar = _snackBar;
    }
    clickAddToQueue(videoId) {
        this.ytpmService.addToQueue({ videoId: videoId }).subscribe((data) => {
            this.showVideoAddedSnackbar(data.title);
        });
    }
    clickPlayNext(videoId) {
        this.ytpmService.addToQueue({ videoId: videoId, front: true }).subscribe((data) => {
            this.showVideoAddedSnackbar(data.title);
        });
    }
    showVideoAddedSnackbar(title) {
        this._snackBar.open(`Added: ${title}`, undefined, { duration: 3000 });
    }
};
ManualAddComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] },
    { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }
];
ManualAddComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-dialog-manual-add',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./manual-add.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/home/manual-add/manual-add.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./manual-add.component.scss */ "./src/app/dialog/home/manual-add/manual-add.component.scss")).default]
    })
], ManualAddComponent);



/***/ }),

/***/ "./src/app/dialog/home/player-qr/player-qr.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/dialog/home/player-qr/player-qr.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#footerbutton {\n  margin-top: 10px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9nL2hvbWUvcGxheWVyLXFyL0M6XFxVc2Vyc1xcbWRiZW5cXERldmVsb3BtZW50XFxzYW5kYm94XFxwYXJ0eW1vZGUtc2FuZGJveDItbmcvc3JjXFxhcHBcXGRpYWxvZ1xcaG9tZVxccGxheWVyLXFyXFxwbGF5ZXItcXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2RpYWxvZy9ob21lL3BsYXllci1xci9wbGF5ZXItcXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9kaWFsb2cvaG9tZS9wbGF5ZXItcXIvcGxheWVyLXFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2Zvb3RlcmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHRleHQtYWxpZ246Y2VudGVyO1xufVxuIiwiI2Zvb3RlcmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/dialog/home/player-qr/player-qr.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dialog/home/player-qr/player-qr.component.ts ***!
  \**************************************************************/
/*! exports provided: PlayerQrComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerQrComponent", function() { return PlayerQrComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");



let PlayerQrComponent = class PlayerQrComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        const loginUrl = `${window.location.protocol}//${window.location.host}/?key=${data.code}`;
        this.loginCode = data.code;
        this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(loginUrl)}`;
    }
    onCloseClick() {
        this.dialogRef.close();
    }
};
PlayerQrComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
PlayerQrComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-player-qr',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./player-qr.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/home/player-qr/player-qr.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./player-qr.component.scss */ "./src/app/dialog/home/player-qr/player-qr.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]))
], PlayerQrComponent);



/***/ }),

/***/ "./src/app/dialog/search/add-options/add-options.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/dialog/search/add-options/add-options.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("button {\n  width: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9nL3NlYXJjaC9hZGQtb3B0aW9ucy9DOlxcVXNlcnNcXG1kYmVuXFxEZXZlbG9wbWVudFxcc2FuZGJveFxccGFydHltb2RlLXNhbmRib3gyLW5nL3NyY1xcYXBwXFxkaWFsb2dcXHNlYXJjaFxcYWRkLW9wdGlvbnNcXGFkZC1vcHRpb25zLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9kaWFsb2cvc2VhcmNoL2FkZC1vcHRpb25zL2FkZC1vcHRpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksVUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9nL3NlYXJjaC9hZGQtb3B0aW9ucy9hZGQtb3B0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImJ1dHRvbiB7XHJcbiAgICB3aWR0aDogNTAlO1xyXG59IiwiYnV0dG9uIHtcbiAgd2lkdGg6IDUwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/dialog/search/add-options/add-options.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/dialog/search/add-options/add-options.component.ts ***!
  \********************************************************************/
/*! exports provided: AddOptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOptionsComponent", function() { return AddOptionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm2015/snack-bar.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");





let AddOptionsComponent = class AddOptionsComponent {
    constructor(ytpmService, _snackBar, data) {
        this.ytpmService = ytpmService;
        this._snackBar = _snackBar;
        this.data = data;
    }
    clickAddToQueue() {
        this.ytpmService.addToQueue({ videoId: this.data.videoId }).subscribe((data) => {
            this.showVideoAddedSnackbar(data.title);
        });
    }
    clickPlayNext() {
        this.ytpmService.addToQueue({ videoId: this.data.videoId, front: true }).subscribe((data) => {
            this.showVideoAddedSnackbar(data.title);
        });
    }
    showVideoAddedSnackbar(title) {
        this._snackBar.open(`Added: ${title}`, undefined, { duration: 3000 });
    }
};
AddOptionsComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] },
    { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
];
AddOptionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-add-options',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./add-options.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/dialog/search/add-options/add-options.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./add-options.component.scss */ "./src/app/dialog/search/add-options/add-options.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"]))
], AddOptionsComponent);



/***/ }),

/***/ "./src/app/helper/authcheck/authcheck.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/helper/authcheck/authcheck.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlbHBlci9hdXRoY2hlY2svYXV0aGNoZWNrLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/helper/authcheck/authcheck.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/helper/authcheck/authcheck.component.ts ***!
  \*********************************************************/
/*! exports provided: AuthcheckComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthcheckComponent", function() { return AuthcheckComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let AuthcheckComponent = class AuthcheckComponent {
    constructor(ytpmService, router, route) {
        this.ytpmService = ytpmService;
        this.router = router;
        route.queryParams.subscribe(params => {
            this.playerKey = params["key"];
        });
    }
    ngOnInit() {
        this.ytpmService.checkToken().subscribe((response) => {
            if (!response.valid) {
                let keyParam = this.playerKey ? `?key=${this.playerKey}` : '';
                this.router.navigateByUrl(`/connect${keyParam}`);
            }
            else {
                this.router.navigateByUrl('/home');
            }
        });
    }
};
AuthcheckComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
AuthcheckComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-authcheck',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./authcheck.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/helper/authcheck/authcheck.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./authcheck.component.scss */ "./src/app/helper/authcheck/authcheck.component.scss")).default]
    })
], AuthcheckComponent);



/***/ }),

/***/ "./src/app/page/connect-player/connect-player.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/page/connect-player/connect-player.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#logo-container {\n  margin-top: 100px;\n  text-align: center;\n}\n\n#logo {\n  font-size: 40pt;\n  font-weight: bold;\n  color: white;\n  background-color: #f00;\n  padding: 15px;\n  border-radius: 15px;\n}\n\n#heading {\n  font-size: 18pt;\n  color: lightgray;\n  text-align: center;\n  margin-top: 50px;\n}\n\n#keyInput {\n  text-transform: uppercase;\n}\n\nmat-form-field {\n  display: block;\n  width: 70%;\n  min-width: 250px;\n  margin-left: auto;\n  margin-right: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9jb25uZWN0LXBsYXllci9DOlxcVXNlcnNcXG1kYmVuXFxEZXZlbG9wbWVudFxcc2FuZGJveFxccGFydHltb2RlLXNhbmRib3gyLW5nL3NyY1xcYXBwXFxwYWdlXFxjb25uZWN0LXBsYXllclxcY29ubmVjdC1wbGF5ZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2UvY29ubmVjdC1wbGF5ZXIvY29ubmVjdC1wbGF5ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFQTtFQUNJLHlCQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcGFnZS9jb25uZWN0LXBsYXllci9jb25uZWN0LXBsYXllci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNsb2dvLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuI2xvZ28ge1xyXG4gICAgZm9udC1zaXplOiA0MHB0O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjAwO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbn1cclxuXHJcbiNoZWFkaW5nIHtcclxuICAgIGZvbnQtc2l6ZTogMThwdDtcclxuICAgIGNvbG9yOiBsaWdodGdyYXk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcblxyXG4ja2V5SW5wdXQge1xyXG4gICAgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO1xyXG59XHJcblxyXG5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiA3MCU7XHJcbiAgICBtaW4td2lkdGg6IDI1MHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbn0iLCIjbG9nby1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4jbG9nbyB7XG4gIGZvbnQtc2l6ZTogNDBwdDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwMDtcbiAgcGFkZGluZzogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbn1cblxuI2hlYWRpbmcge1xuICBmb250LXNpemU6IDE4cHQ7XG4gIGNvbG9yOiBsaWdodGdyYXk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNTBweDtcbn1cblxuI2tleUlucHV0IHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxubWF0LWZvcm0tZmllbGQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDcwJTtcbiAgbWluLXdpZHRoOiAyNTBweDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn0iXX0= */");

/***/ }),

/***/ "./src/app/page/connect-player/connect-player.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/page/connect-player/connect-player.component.ts ***!
  \*****************************************************************/
/*! exports provided: ConnectPlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectPlayerComponent", function() { return ConnectPlayerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let ConnectPlayerComponent = class ConnectPlayerComponent {
    constructor(ytpmService, router, route) {
        this.ytpmService = ytpmService;
        this.router = router;
        route.queryParams.subscribe(params => {
            let key = params["key"] || '';
            this.playerKey = key.substring(0, 5);
        });
    }
    ngOnInit() {
        this.ytpmService.checkToken().subscribe((response) => {
            if (response.valid) {
                this.router.navigateByUrl('/home');
            }
        });
    }
    signIn(name, key) {
        this.ytpmService.auth(name, key).subscribe(() => this.router.navigateByUrl('/'));
    }
};
ConnectPlayerComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
ConnectPlayerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-connect-player',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./connect-player.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/connect-player/connect-player.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./connect-player.component.scss */ "./src/app/page/connect-player/connect-player.component.scss")).default]
    })
], ConnectPlayerComponent);



/***/ }),

/***/ "./src/app/page/featured-menu/featured-menu.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/page/featured-menu/featured-menu.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".channel {\n  color: rgba(255, 255, 255, 0.4);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9mZWF0dXJlZC1tZW51L0M6XFxVc2Vyc1xcbWRiZW5cXERldmVsb3BtZW50XFxzYW5kYm94XFxwYXJ0eW1vZGUtc2FuZGJveDItbmcvc3JjXFxhcHBcXHBhZ2VcXGZlYXR1cmVkLW1lbnVcXGZlYXR1cmVkLW1lbnUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2UvZmVhdHVyZWQtbWVudS9mZWF0dXJlZC1tZW51LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksK0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2UvZmVhdHVyZWQtbWVudS9mZWF0dXJlZC1tZW51LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoYW5uZWwge1xyXG4gICAgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC40KTtcclxufVxyXG5cclxuLy8gbWF0LXRhYi1ncm91cCB7XHJcbi8vICAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDU2cHgpO1xyXG4vLyB9IiwiLmNoYW5uZWwge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/page/featured-menu/featured-menu.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/page/featured-menu/featured-menu.component.ts ***!
  \***************************************************************/
/*! exports provided: FeaturedMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturedMenuComponent", function() { return FeaturedMenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");




let FeaturedMenuComponent = class FeaturedMenuComponent {
    constructor(ytpmService, router) {
        this.ytpmService = ytpmService;
        this.router = router;
    }
    ngOnInit() {
        this.getLists();
        this.getChannels();
    }
    homeButton() {
        this.router.navigateByUrl('/home');
    }
    getLists() {
        this.ytpmService.getLists().subscribe(newLists => this.lists = newLists);
    }
    getChannels() {
        this.ytpmService.getChannels().subscribe(newChannels => this.channels = newChannels);
    }
};
FeaturedMenuComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_3__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
FeaturedMenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-featured-menu',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./featured-menu.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/featured-menu/featured-menu.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./featured-menu.component.scss */ "./src/app/page/featured-menu/featured-menu.component.scss")).default]
    })
], FeaturedMenuComponent);



/***/ }),

/***/ "./src/app/page/history/history.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/page/history/history.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".thumbnail {\n  width: 70px !important;\n  height: 50px !important;\n  border-radius: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9oaXN0b3J5L0M6XFxVc2Vyc1xcbWRiZW5cXERldmVsb3BtZW50XFxzYW5kYm94XFxwYXJ0eW1vZGUtc2FuZGJveDItbmcvc3JjXFxhcHBcXHBhZ2VcXGhpc3RvcnlcXGhpc3RvcnkuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2UvaGlzdG9yeS9oaXN0b3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0JBQUE7RUFDQSx1QkFBQTtFQUNBLDZCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlL2hpc3RvcnkvaGlzdG9yeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aHVtYm5haWwge1xyXG4gICAgd2lkdGg6IDcwcHggIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogNTBweCAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XHJcbn0iLCIudGh1bWJuYWlsIHtcbiAgd2lkdGg6IDcwcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/page/history/history.component.ts":
/*!***************************************************!*\
  !*** ./src/app/page/history/history.component.ts ***!
  \***************************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let HistoryComponent = class HistoryComponent {
    constructor(ytpmService, router) {
        this.ytpmService = ytpmService;
        this.router = router;
    }
    ngOnInit() {
        this.ytpmService.getHistory().subscribe((response) => this.historyItems = response);
    }
    homeButton() {
        this.router.navigateByUrl('/home');
    }
};
HistoryComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
HistoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-history',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./history.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/history/history.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./history.component.scss */ "./src/app/page/history/history.component.scss")).default]
    })
], HistoryComponent);



/***/ }),

/***/ "./src/app/page/home/home.component.scss":
/*!***********************************************!*\
  !*** ./src/app/page/home/home.component.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#logo {\n  background-color: #f00;\n  padding: 5px;\n  border-radius: 5px;\n  font-weight: bold;\n}\n\n#powered_by {\n  margin-top: 30px;\n  color: white;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9ob21lL0M6XFxVc2Vyc1xcbWRiZW5cXERldmVsb3BtZW50XFxzYW5kYm94XFxwYXJ0eW1vZGUtc2FuZGJveDItbmcvc3JjXFxhcHBcXHBhZ2VcXGhvbWVcXGhvbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2UvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3BhZ2UvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2xvZ28ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjAwO1xuICBwYWRkaW5nOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbiNwb3dlcmVkX2J5IHtcbiAgbWFyZ2luLXRvcDogMzBweDtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iLCIjbG9nbyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMDA7XG4gIHBhZGRpbmc6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuI3Bvd2VyZWRfYnkge1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/page/home/home.component.ts":
/*!*********************************************!*\
  !*** ./src/app/page/home/home.component.ts ***!
  \*********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




let HomeComponent = class HomeComponent {
    constructor(ytpmService) {
        this.ytpmService = ytpmService;
        // Dummy data, just so it's initially valid before the http request comes back.
        this.status = {
            playingNow: {},
            upNext: {},
            playerStatus: 'UNKNOWN',
            lastUpdated: 0,
            playerCode: '',
            queueLength: NaN,
        };
        this.statusSub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
    }
    ngOnInit() {
        this.getStatus();
    }
    ngOnDestroy() {
        this.statusSub.unsubscribe();
    }
    getStatus(lastUpdated = 0) {
        this.statusSub.unsubscribe();
        this.statusSub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
        this.statusSub.add(this.ytpmService.getStatus(lastUpdated).subscribe(status => {
            let since = lastUpdated;
            if (status) {
                this.status = Object.assign({ playingNow: {}, upNext: {}, playerStatus: "UNKNOWN" }, status);
                since = status.lastUpdated;
            }
            this.getStatus(since);
        }));
    }
};
HomeComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] }
];
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.scss */ "./src/app/page/home/home.component.scss")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/page/queue/queue.component.scss":
/*!*************************************************!*\
  !*** ./src/app/page/queue/queue.component.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".thumbnail {\n  width: 70px !important;\n  height: 50px !important;\n  border-radius: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9xdWV1ZS9DOlxcVXNlcnNcXG1kYmVuXFxEZXZlbG9wbWVudFxcc2FuZGJveFxccGFydHltb2RlLXNhbmRib3gyLW5nL3NyY1xcYXBwXFxwYWdlXFxxdWV1ZVxccXVldWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2UvcXVldWUvcXVldWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNkJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2UvcXVldWUvcXVldWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGh1bWJuYWlsIHtcclxuICAgIHdpZHRoOiA3MHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDUwcHggIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xyXG59IiwiLnRodW1ibmFpbCB7XG4gIHdpZHRoOiA3MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNTBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/page/queue/queue.component.ts":
/*!***********************************************!*\
  !*** ./src/app/page/queue/queue.component.ts ***!
  \***********************************************/
/*! exports provided: QueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueComponent", function() { return QueueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let QueueComponent = class QueueComponent {
    constructor(ytpmService, router) {
        this.ytpmService = ytpmService;
        this.router = router;
    }
    ngOnInit() {
        this.ytpmService.getQueue().subscribe((response) => this.state = response);
    }
    homeButton() {
        this.router.navigateByUrl('/home');
    }
};
QueueComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_2__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
QueueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-queue',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./queue.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/queue/queue.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./queue.component.scss */ "./src/app/page/queue/queue.component.scss")).default]
    })
], QueueComponent);



/***/ }),

/***/ "./src/app/page/search/search.component.scss":
/*!***************************************************!*\
  !*** ./src/app/page/search/search.component.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  margin-top: 20px;\n  width: 100%;\n  flex: 2;\n}\n\nform {\n  display: flex;\n  width: 100%;\n}\n\nmat-list-item {\n  overflow: hidden;\n  height: 70px;\n}\n\n#name {\n  margin-right: 10px;\n}\n\n#channel {\n  margin-right: 10px;\n}\n\n#searchBtn {\n  margin-top: 37px;\n}\n\n.thumbnail {\n  width: 70px !important;\n  height: 50px !important;\n  border-radius: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZS9zZWFyY2gvQzpcXFVzZXJzXFxtZGJlblxcRGV2ZWxvcG1lbnRcXHNhbmRib3hcXHBhcnR5bW9kZS1zYW5kYm94Mi1uZy9zcmNcXGFwcFxccGFnZVxcc2VhcmNoXFxzZWFyY2guY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2Uvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLE9BQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7QUNDRjs7QURHQTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSw2QkFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvcGFnZS9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWZvcm0tZmllbGQge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMjtcbn1cblxuZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtbGlzdC1pdGVtIHtcbiAgb3ZlcmZsb3c6aGlkZGVuO1xuICBoZWlnaHQ6NzBweDtcbn1cblxuI25hbWUge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbiNjaGFubmVsIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4jc2VhcmNoQnRue1xuICBtYXJnaW4tdG9wOiAzN3B4O1xufVxuXG5cbi50aHVtYm5haWwge1xuICB3aWR0aDogNzBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDUwcHggIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG59IiwibWF0LWZvcm0tZmllbGQge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMjtcbn1cblxuZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtbGlzdC1pdGVtIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3MHB4O1xufVxuXG4jbmFtZSB7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuI2NoYW5uZWwge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbiNzZWFyY2hCdG4ge1xuICBtYXJnaW4tdG9wOiAzN3B4O1xufVxuXG4udGh1bWJuYWlsIHtcbiAgd2lkdGg6IDcwcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAhaW1wb3J0YW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/page/search/search.component.ts":
/*!*************************************************!*\
  !*** ./src/app/page/search/search.component.ts ***!
  \*************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/ytpm.service */ "./src/app/ytpm.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var src_app_dialog_search_add_options_add_options_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dialog/search/add-options/add-options.component */ "./src/app/dialog/search/add-options/add-options.component.ts");






let SearchComponent = class SearchComponent {
    constructor(ytpmService, router, dialog) {
        this.ytpmService = ytpmService;
        this.router = router;
        this.dialog = dialog;
        this.autoComplete = [];
        this.searchResults = [];
    }
    ngOnInit() {
        this.searchField.nativeElement.focus();
        this.onSearchChange('');
    }
    homeButton() {
        this.router.navigateByUrl('/home');
    }
    onSearchChange(autoCompleteTerm) {
        this.searchResults = [];
        this.ytpmService.getAutoComplete(autoCompleteTerm).subscribe((results) => this.autoComplete = results);
    }
    onFormSubmit(searchTerm, event) {
        event.preventDefault();
        this.search(searchTerm);
    }
    search(searchTerm) {
        this.searchField.nativeElement.value = searchTerm;
        this.ytpmService.getSearchResults(searchTerm).subscribe((result) => {
            this.nextPage = result.nextPageToken;
            this.searchResults = result.results;
        });
    }
    add(videoId) {
        this.dialog.open(src_app_dialog_search_add_options_add_options_component__WEBPACK_IMPORTED_MODULE_5__["AddOptionsComponent"], {
            height: '170px',
            width: '300px',
            data: {
                videoId: videoId,
            }
        });
    }
};
SearchComponent.ctorParameters = () => [
    { type: src_app_ytpm_service__WEBPACK_IMPORTED_MODULE_3__["YtpmService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBox', { static: true })
], SearchComponent.prototype, "searchField", void 0);
SearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-search',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./search.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/page/search/search.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./search.component.scss */ "./src/app/page/search/search.component.scss")).default]
    })
], SearchComponent);



/***/ }),

/***/ "./src/app/ytpm.service.ts":
/*!*********************************!*\
  !*** ./src/app/ytpm.service.ts ***!
  \*********************************/
/*! exports provided: YtpmService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YtpmService", function() { return YtpmService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage-service */ "./node_modules/ngx-webstorage-service/fesm2015/ngx-webstorage-service.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");






const AUTH_TOKEN_STORAGE_KEY = "ytpm-auth";
let YtpmService = class YtpmService {
    constructor(http, storage) {
        this.http = http;
        this.storage = storage;
        this.baseUrl = 'http://ytpm.thealternator.nz/api/client';
        this.token = '';
        this.token = storage.get(AUTH_TOKEN_STORAGE_KEY);
    }
    getStatus(lastUpdate = 0) {
        const url = this.buildUrl(`${this.baseUrl}/a/poll/v2`, {
            'token': this.token,
            'since': `${lastUpdate}`
        });
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getStatus')));
    }
    getChannels() {
        const url = this.buildUrl(`${this.baseUrl}/discovery/channels`);
        return this.http.get(url);
    }
    getLists() {
        const url = this.buildUrl(`${this.baseUrl}/discovery/lists`);
        return this.http.get(url);
    }
    getQueue() {
        const url = this.buildUrl(`${this.baseUrl}/a/queue_state`, {
            'token': this.token,
        });
        return this.http.get(url);
    }
    getHistory() {
        const url = this.buildUrl(`${this.baseUrl}/a/play_history`, {
            'token': this.token,
        });
        return this.http.get(url);
    }
    getAutoComplete(term) {
        const url = this.buildUrl(`${this.baseUrl}/autocomplete`, {
            'q': term
        });
        return this.http.get(url);
    }
    getSearchResults(term, page) {
        const url = this.buildUrl(`${this.baseUrl}/search`, {
            'q': term,
            'page': page
        });
        return this.http.get(url);
    }
    sendCommand(command) {
        const url = this.buildUrl(`${this.baseUrl}/a/send_command`, {
            'token': this.token
        });
        this.http.post(url, { command: command }).subscribe(() => undefined);
    }
    checkToken() {
        if (!this.token) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ valid: false });
        }
        const url = this.buildUrl(`${this.baseUrl}/auth/validate`, {
            'token': this.token,
        });
        return this.http.get(url);
    }
    auth(name, key) {
        const url = this.buildUrl(`${this.baseUrl}/auth`, {
            'auth': key,
            'name': name,
        });
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((response) => this.setToken(response.token)));
    }
    deauth() {
        if (!this.token) {
            return;
        }
        const url = this.buildUrl(`${this.baseUrl}/a/deauth`, {
            'token': this.token
        });
        console.log(url);
        this.http.get(url).subscribe(() => undefined);
        this.storage.remove(AUTH_TOKEN_STORAGE_KEY);
    }
    addToQueue(args) {
        const url = this.buildUrl(`${this.baseUrl}/a/enqueue`, {
            'token': this.token,
            'videoId': args.videoId,
            'next': args.front ? 'true' : undefined,
            'noinfluence': args.noinfluence ? 'true' : undefined,
        });
        console.log(url);
        return this.http.get(url);
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: identify if the error is a 403 (auth) or generic error.
            // If 403, remove token and redirect to login screen.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    }
    setToken(token) {
        this.storage.set(AUTH_TOKEN_STORAGE_KEY, token);
        this.token = token;
    }
    buildUrl(base, params = {}) {
        let url = base;
        let first = true;
        for (const key in params) {
            const value = params[key];
            if (params.hasOwnProperty(key) && value) {
                url += `${first ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
                first = false;
            }
        }
        return url;
    }
};
YtpmService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_4__["LOCAL_STORAGE"],] }] }
];
YtpmService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_4__["LOCAL_STORAGE"]))
], YtpmService);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");






if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\mdben\Development\sandbox\partymode-sandbox2-ng\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map