<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;
use App\Models\Domains;
use App\Models\Countries;
use App\Models\DomainsEspelciaty;
use App\Models\DomainSupport;

class DomainsController extends Controller
{
    //
    public function index(){
        $content = Content::find(14);
        $result['content']=$content;
        return $result;
    }

    public function domain($extension){
        $domain = Domains::with("specialty")->where('alias', $extension)->first();

        $result['ciclo']=Content::find(15);
        $result['residence']=Content::find(16);
        $result['technicals']=Content::find(17);
        $result['registration']=Content::find(18);
        $result['transfers']=Content::find(19);
        $result['renewals']=Content::find(20);
        $result['cancelation']=Content::find(21);
        $result['updatedns']=Content::find(22);
        $result['changeowner']=Content::find(24);
        $result['officialinfo']=Content::find(23);

        $result['domain']=$domain;

        $result['domain_support']=DomainSupport::all();

        $result['may_like']=Domains::where('countryid',$domain->countryid)
        ->where('price',"!=","")
        ->where('id',"!=", $domain->id)
        ->where('onsale',1)
        ->get();
        
        if(!is_null($domain->countryid)){
            $result['country_domain'] = Countries::find($domain->countryid);
        }

        $result['domains_same'] = Domains::where('espid',$domain->espid)
            ->where('id','!=',$domain->id)
            ->where('onsale',1)
            ->get();

        return $result;
    }

    public function checkdomain(){
        $domain = $_GET['domains'];

        $domain = explode('|', $domain);
        $recommended_domains = [];

        if(count($domain) === 1){
            $tld = explode(".",$domain[0]);
            $name=$tld[0];
            unset($tld[0]);
            $tld_se=implode("",$tld);
            $getDomainInfo = Domains::with('country')->where('alias',$tld_se)->first(['price','priceoffert','countryid','id']);
            
            $extensions = Domains::where('countryid', $getDomainInfo->countryid)
            ->where('id','!=', $getDomainInfo->id)
            ->where('onsale',1)
            ->get();
            $countd=0;
            foreach ($extensions as $ex) {
                $domainthis = $name.$ex->extension;
                $tld_sed = $tld = explode(".",$domainthis);
                unset($tld_sed[0]);
                $tld_sed = implode("",$tld_sed);

                $getDomainInfod = Domains::with('country')
                ->where('alias',$tld_sed)
                ->first(['price','priceoffert','countryid','id', 'extension']);

                $recommended_domains[$countd] = $this->apiCall('DomainWhois', ['domain'=>$name.$ex->extension]);
                $recommended_domains[$countd]['domainInfo']=$getDomainInfod;
                $recommended_domains[$countd]['domain'] = $domainthis;
                $recommended_domains[$countd]['tld'] = $ex->extension;
                $countd++;
            }

            
        }


        $count=0;
        foreach($domain as $d){
            $whois[$count] = $this->apiCall('DomainWhois', ['domain'=>$d]);
            $tld = explode(".",$d);
            $name=$tld[0];

            if(count($tld) > 1){                
                unset($tld[0]);
                $tld_dot=implode(".",$tld);
                $tld_se=implode("",$tld);
            }

            $getDomainInfo = Domains::with('country')->where('alias',$tld_se)->first(['price','priceoffert','countryid','id']);            

            $whois[$count]['domainInfo']=$getDomainInfo;
            $whois[$count]['domain'] = $d;
            $whois[$count]['tld'] = $tld_dot;
            $count++;
        }

        $result['domains'] = $whois;
        $result['recommended'] = $recommended_domains;
        return $result;
    }
}
