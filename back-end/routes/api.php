<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\DomainsController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get( 'index', [ ApiController::class, 'index'] );
Route::get( 'about', [ AboutController::class, 'index'] );
Route::get( 'home', [ HomeController::class, 'home'] );
Route::get( 'home/slideshow', [ HomeController::class, 'slideshow'] );
Route::get( 'home/addonsAndReasons', [ HomeController::class, 'addonsAndReasons'] );
Route::get( 'home/bottomContent', [ HomeController::class, 'bottomContent'] );
Route::get( 'generateTranslations', [ ApiController::class, 'generateTranslations'] );
Route::get( 'services', [ ServicesController::class, 'index'] );
Route::get( 'contact', [ ContactController::class, 'index'] );
Route::get( 'legalities', [ ContentController::class, 'legalities'] );
Route::get( 'domains', [ DomainsController::class, 'index'] );
Route::get( 'domain/{ext}', [ DomainsController::class, 'domain'] );
Route::get( 'checkdomain', [ DomainsController::class, 'checkdomain'] );


