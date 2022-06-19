<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;

class ContentController extends Controller
{
    public function legalities(){
        $lang = $_GET['lang'];
        $countryid = $_GET['country'];

        $contents = Content::where('catid', 3)->get();
        $result['contents']=$contents;

        return $result;
    }
}
