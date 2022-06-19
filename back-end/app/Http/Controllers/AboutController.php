<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Reasons;
use App\Models\DomainsMetasAbout;


use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];

        $about = DomainsMetasAbout::where('countryid',$countryid)->first();
        $result['about']=$about;

        $differents = Content::find(33);
        $result['differents']=$differents;

        $reasons = Reasons::all()
        ->random(6);
        $result['reasons']=$reasons;

        $visionandmision = Content::find(76);
        $result['visionandmision']=$visionandmision;

        $quality = Content::find(77);
        $result['quality']=$quality;

        $good = Content::find(84);
        $result['good']=$good;

        return $result;
    }

    
}
