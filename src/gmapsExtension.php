<?php

namespace Bolt\Extension\boltabandoned\gmaps;

use Bolt\Extension\SimpleExtension;

use Bolt\Asset\Target;
use Bolt\Asset\Snippet\Snippet;
use Bolt\Asset\File\JavaScript;
use Bolt\Asset\File\Stylesheet;

/**
 * Gmaps extension for bolt
 *
 * Copyright (C) 2015-2016 Alan Smithee
 *
 * This program is free software: you can redistribute it under the terms of 
 * the GNU General Public License or GNU Lesser General Public License as 
 * published by the Free Software Foundation, either version 3 of the Licenses,
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    Alan Smithee <alan.smithee@example.com>
 * @copyright Copyright (c) 2015-2016, Alan Smithee
 * @license   http://opensource.org/licenses/GPL-3.0 GNU Public License 3.0
 * @license   http://opensource.org/licenses/LGPL-3.0 GNU Lesser General Public License 3.0
 */
class gmapsExtension extends SimpleExtension
{
    private $map = [];

    private $args = [];

    private $defaults =  [
        'html' => '',
        'icon' => "fa-map-marker",
        'color' => "rgba(0,0,0,1)",
        'map' => false,
        'maps' => [],
        'record' => false,
        'records' => [],
        'geolocation_field' => "geolocation",
        'html_field' => "body",
        'icon_field' => "icon",
        'color_field' => "color",
        'geolocation' => false,
        'duration_holder' => "",
        'distance_holder' => "",
        'visitor_icon' => "fa-male",
        'visitor_color' => "rgba(0,0,0,1)",
        'travel_mode' => 'driving',
        'units' => 'metric'
    ];

    private $mapfields =  [
        'records',
        'map',
        'record',
        'latitude',
        'longitude',
        'html',
        'icon',
        'color',
        'maps'
    ];

    private $assetsAdded = false;

    protected function registerTwigFunctions()
    {
        return [
            'map' => ['map', ['is_variadic' => true]]
        ];
    }

    public function isSafe()
    {
        return true;
    }
    
    protected function registerAssets()
    {
        $app = $this->getContainer();
        $fileAssets = [];
        $snippetAssets = [];

        if (!$app['config']->get('general/gmaps_disable_script', false)){
            array_push(
                $snippetAssets,
                (new Snippet())->setCallback([$this, 'callbackSnippet'])->setLocation(Target::END_OF_BODY)
            );
            array_push(
                $fileAssets,
                (new JavaScript('gmaps.js'))->setLocation(Target::END_OF_BODY)
            );
        }
        if (!$app['config']->get('general/gmaps_disable_style', false)){
            array_push(
                $fileAssets,
                new Stylesheet('gmaps.css')
            );
        }
        $this->fileQueue = $fileAssets;
        $this->snippetQueue = $snippetAssets;
    }

    public function callbackSnippet()
    {
        return '<script>var gapikey = "'.($this->getContainer())['config']->get('general/google_api_key').'"</script>';
    }

    public function map(array $args = [])
    {
        $app = $this->getContainer();
        if(!$this->assetsAdded){
            foreach($this->fileQueue as $asset){
                $file = $this->getWebDirectory()->getFile($asset->getPath());
                $asset->setPackageName('extensions')->setPath($file->getPath());
                $app['asset.queue.file']->add($asset);
            }
            foreach($this->snippetQueue as $asset){
                $app['asset.queue.snippet']->add($asset);
            }
            $this->assetsAdded = true;
        }
        $this->args = array_merge($this->defaults, $args);

        $this->unifyData();

        $this->map = [];

        foreach ($this->args['records'] as $record){
            $field = $record[$this->args['geolocation_field']];
            array_push(
                $this->map,
                [
                    'latitude' => $field['latitude'],
                    'longitude' => $field['longitude'],
                    'html' => $record[$this->args['html_field']] ?: $field['formatted_address'],
                    'icon' => $record[$this->args['icon_field']] ?: $this->args['icon'],
                    'color' => $record[$this->args['color_field']] ?: $this->args['color']
                ]
            );
        }
        foreach ($this->args['maps'] as $this->mapItem){
            array_push(
                $this->map,
                [
                    'latitude' => $this->mapItem['latitude'],
                    'longitude' => $this->mapItem['longitude'],
                    'html' => $this->args['html'] ?: ($this->mapItem['html'] ?: $this->mapItem['formatted_address']),
                    'icon' => $this->mapItem['icon'] ?: $this->args['icon'],
                    'color' => $this->mapItem['color'] ?: $this->args['color']
                ]
            );
        }
        
        $this->removeData();
        $options = json_encode($this->args, JSON_HEX_APOS);
        $map = json_encode($this->map, JSON_HEX_APOS);

        $str = "<div class='map-canvas' data-mapobj='$map' data-options='$options'></div>";
        return new \Twig_Markup($str, 'UTF-8');
    }
    
    private function unifyData()
    {
        if($this->args['record']) {
            array_push(
                $this->args['records'],
                $this->args['record']
            );
        }
        if($this->args['map']) {
            array_push(
                $this->args['maps'],
                $this->args['map']
            );
        }
        if($this->args['latitude']) {
            array_push(
                $this->args['maps'],
                [
                    'latitude' => $this->args['latitude'],
                    'longitude' => $this->args['longitude'],
                    'html' => $this->args['html'],
                    'icon' => $this->args['icon'],
                    'color' => $this->args['color']
                ]
            );
        }
    }
    private function removeData()
    {
        foreach ($this->mapfields as $this->mapfield){
            unset($this->args[$this->mapfield]);
        }
    }    
}
