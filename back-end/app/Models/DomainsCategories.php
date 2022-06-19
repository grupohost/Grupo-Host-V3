<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DomainsCategories extends Model
{
    use HasFactory;

    protected $table = 'domains_categories';
    protected $primaryKey = 'id';
}
