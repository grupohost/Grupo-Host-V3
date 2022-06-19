<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MenuItems;

class Menus extends Model
{
    use HasFactory;

    protected $table = 'menus';
    protected $primaryKey = 'id';

    public function links()
    {
        $links = $this->hasMany(MenuItems::class, 'menu_id', 'id');

        return $links;
    }

}
