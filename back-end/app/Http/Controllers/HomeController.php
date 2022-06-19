<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Languages;
use App\Models\Currencies;
use App\Models\Countries;
use App\Models\MenuItems;
use App\Models\Menus;
use App\Models\Translations;
use App\Models\Domains;
use App\Models\Slideshow;
use App\Models\Addons;
use App\Models\Features;
use App\Models\Reasons;
use App\Models\Content;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];

        $slideshow = Slideshow::where('catid',6)->get();
        $result['slideshow']=$slideshow;

        $addons=Addons::all('id','title','img');
        $result['addons']=$addons;

        $reasons=Reasons::all();
        $result['reasons']=$reasons;

        $change=Content::find(13);
        $result['change']=$change;

        $features=Features::all('id','title', 'icon', 'subtitle')->take(4);
        $result['features']=$features;

        return $result;
    }

    public function slideshow(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];
        $slideshow = Slideshow::where('catid',6)->get();
        $result['slideshow']=$slideshow;
        return $result;
    }
    
    public function addonsAndReasons(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];
        $addons=Addons::all('id','title','img');
        $result['addons']=$addons;

        $reasons=Reasons::all();
        $result['reasons']=$reasons;

        return $result;
    }

    public function bottomContent(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];
        
        $change=Content::find(13);
        $result['change']=$change;

        $features=Features::all('id','title', 'icon', 'subtitle')->take(4);
        $result['features']=$features;

        return $result;
    }
}
