<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Models\Translations;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function translate($alias, $lang){
        $result = Translations::whereRaw('alias LIKE "'. $alias .'" AND langid = "' . $lang . '"')
        ->select('value')
        ->take(1)
        ->first();
        if(isset($result->value)){
            return strip_tags($result->value,'<ul>,<li>');
        }else{
            return $alias;
        }
    }

    protected function addTranslation($collection, $fields = array(), $lang){        
        $name = get_class($collection);
        foreach($fields as $field){
            $title_translated=$field.'_translated';
            if( str_contains($name, 'App\Models' )){                
                $translate = $this->translate($collection->$field, $lang);
                $collection->$title_translated=$translate;
            }else{
                $collection->each(function ( $i, $key) use ($field, $lang, $title_translated) {
                    $translate = $this->translate($i->$field, $lang);
                    $i->$title_translated = $translate;
                    return $i;
                });
            }
        }
        return $collection;
    }

    private function api_identifier(){
        return 'X1ACsHguBBY8NlJZ7IPqqA9qdZCAGWT7';
    }

    private function pi_secret(){
        return 'sTm9VVvnGa2cnTEJ8Du0Hu7Vl53Mxf8Y';
    }

    protected function apiCall($action,$postfields){
        $postfields['identifier'] = $this->api_identifier();
        $postfields['secret'] = $this->pi_secret();
        $postfields['action'] = $action;
        $postfields['responsetype'] = 'json';
        
        $whmcsUrl="https://cp.grupo.host/";
        // Call the API
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $whmcsUrl . 'includes/api.php');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postfields));
        $response = curl_exec($ch);

        if (curl_error($ch)) {
            die('Unable to connect: ' . curl_errno($ch) . ' - ' . curl_error($ch));
        }
        curl_close($ch);
        $jsonData = json_decode($response, true);
        return $jsonData;        
    }
}
