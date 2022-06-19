<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItems extends Model
{
    use HasFactory;

    protected $table = 'menu_items';
    protected $primaryKey = 'id';

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'id', 'menu_id');
    }

    public function linktranslation()
    {
        return $this->belongsTo(Menu::class, 'id', 'menu_id');
    }
}
