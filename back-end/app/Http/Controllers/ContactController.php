<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;
use App\Models\Countries;
use App\Models\DomainsMetasAbout;
use App\Models\Languages;

class ContactController extends Controller
{
    public function index(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];

        $about = DomainsMetasAbout::where('countryid',$countryid)->first();
        $result['about']=$about;

        $country = Countries::find($countryid);
        $result['country']=$country;

        $content = Content::find(36);
        $result['content']=$content;

        $contentd = Content::find(59);
        $result['contentd']=$contentd;

        $language = Languages::find($lang);
        $result['language']=$language;

        return $result;
    }
}
