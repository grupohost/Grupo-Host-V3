<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domains extends Model
{
    use HasFactory;

    protected $table = 'domains';
    protected $primaryKey = 'id';

    public function category()
    {
        return $this->belongsTo(DomainsCategories::class,'catid','id');
    }

    public function specialty()
    {
        return $this->belongsTo(DomainsEspelciaty::class,'espid','id');
    }

    public function country()
    {
        return $this->belongsTo(Countries::class,'countryid','id');
    }
}
