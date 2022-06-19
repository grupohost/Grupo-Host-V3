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
use File;

class ApiController extends Controller
{
    public function index(){
        $result['main'] = Admin::find(1, [
            'logo',
            'websitename',
        ]);

        $lang = $_GET['lang'];
        $countryid = $_GET['country'];

        $country = Countries::find($countryid, [
            'id',
            'name',
            'currencyid',
            'languageid'
        ]);
        $country->getCurrency;

        $result['selected_country'] = $country;

        $result['languages'] = Languages::all();
        $result['currencies'] = Currencies::all(['id','symbol','code']);
        $result['countries'] = Countries::all(['id','name','img']);

        $links = MenuItems::where('menu_id', 1)->get(['id','name','link','parent_id']);

        $links_footer = Menus::whereIn('id', [2,3,4,5])
        ->get();

        foreach($links_footer as $p){
            $resulting = MenuItems::where( 'menu_id',$p->id )->get(['link', 'name', 'id']);
            $p->links = $resulting;
        }

        $result['main_menu'] = $links;
        $result['menus_footer'] = $links_footer;

        $result['domains'] = Domains::where([
            'countryid' => $countryid
        ])
        ->take(3)
        ->get(['id', 'extension', 'catid', 'img']);

        return $result;
    }
    
    public function generateTranslations(){
        $languages = Languages::all();
        foreach($languages as $l){
            $translations = Translations::where('langid', $l->id)->get(['value', 'alias', 'model', 'field', 'itemid']);
            $data = json_encode($translations);
            $file = $l->id. '_translations.json';
            $destinationPath=public_path()."/translations/";
            if (!is_dir($destinationPath)) {  mkdir($destinationPath,0777,true);  }
            $result['destinationPath']=$destinationPath;
            $result['file']=$file;
            File::put($destinationPath.$file,$data);
        }
        $domains = $domains = Domains::with('specialty')->get(['id','extension','espid','alias']);
        $domain_data = json_encode($domains);
        $file_domain = 'domains_ext.json';
        $destinationPath_domain=public_path()."/domains/";
        if (!is_dir($destinationPath_domain)) {  mkdir($destinationPath_domain,0777,true);  }
        $result['destinationPath_domain']=$destinationPath_domain;
        $result['file_domain']=$file_domain;
        File::put($destinationPath_domain.$file_domain,$domain_data);
        
        return $result;
       
      }
}
