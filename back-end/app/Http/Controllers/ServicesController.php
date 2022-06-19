<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\ProductsCategories;

use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];

        $services_content = Content::find(35);
        $result['service_content']=$services_content;

        $services = ProductsCategories::where('parentid',null)->get(['title','img','slogan','alias']);
        $result['services']=$services;
        return $result;
    }

    
}
