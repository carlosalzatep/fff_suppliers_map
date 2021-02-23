
<div class="categorie-header flex-block line-dash">
    <div class="info">
        <h2>{$FFF_MAP_SUPPLIERS_PAGE_TITLE|escape:'html'}</h2>
        <p></p>
        <p>
        <span>
           {$FFF_MAP_SUPPLIERS_PAGE_SUBTITLE|escape:'html'}
        </p>
        <p></p>
    </div>
</div>

<section id="supplier_map">
    <div class="row">
        <div id="map_filter" class="col-lg rounded-container">

            <div class="row mb-3" id="supplier_map_search_form">
                <form>
                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
                <input type="text" id="sw" name="sw" value="" placeholder="Rechercher" class="ui-autocomplete-input" autocomplete="off">
                <button id="searchButton" type="button">
                    <img src="../themes/fffthemechild/assets/images/search-supplier-map.png" alt="">
                </button>
                </form>
            </div>

            <div class="row line-dash mb-4 pb-4" id="supplier_map_search_filter">
                <div class="col-sm-8 p-0">
                    <p class="filter_title">Filtrer par:</p>

                    <div class="dropdown">
                        <button id="categorySelect" rel="nofollow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{l s='Catégorie' d='Shop.Theme.Global'}</button>
                        <div class="dropdown-menu">
                            <a rel="nofollow" class="select-list js-search-link" onclick="setCategoryFilter('')">{l s='Catégorie' d='Shop.Theme.Global'}</a>
                            {foreach key=key item=item from=$category name=foo}
                                <a rel="nofollow" class="select-list js-search-link" onclick="setCategoryFilter('{$item.name|escape:"quotes"}')">{$item.name|escape:"htmlall"}</a>
                            {/foreach}
                        </div>
                    </div>

                    <div class="dropdown">
                        <button id="labelSelect" rel="nofollow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{l s='Label' d='Shop.Theme.Global'}</button>
                        <div class="dropdown-menu">
                            <a rel="nofollow" class="select-list js-search-link" onclick="setLabelFilter('')">{l s='Label' d='Shop.Theme.Global'}</a>
                            {foreach key=key item=item from=$label name=foo}
                                <a rel="nofollow" class="select-list js-search-link" onclick="setLabelFilter('{$item.title|escape:"quotes"}')">{$item.title|escape:"htmlall"}</a>
                            {/foreach}
                        </div>
                    </div>
                    
                </div>  
                <div class="col-sm-4 pr-0">
                    <p class="filter_title">Trier par :</p>
                    <div class="dropdown">
                        <button id="trierpar" rel="nofollow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{l s='Options' d='Shop.Theme.Global'}</button>
                        <div class="dropdown-menu">
                            <a rel="nofollow" class="select-list js-search-link" onclick="setOrderVar(4, 'Options')">{l s='Options' d='Shop.Theme.Global'}</a>
                            <a rel="nofollow" class="select-list js-search-link" onclick="setOrderVar(1, 'Nom, A à Z')">Nom, A à Z</a>
                            <a rel="nofollow" class="select-list js-search-link" onclick="setOrderVar(2, 'Nom, Z à A')">Nom, Z à A</a>
                            <a rel="nofollow" class="select-list js-search-link" onclick="setOrderVar(3, 'Le plus récent')">Le plus récent</a>
                            <a rel="nofollow" class="select-list js-search-link" onclick="setOrderVar(4, 'Moins récent')">Moins récent</a>
                        </div>
                    </div> 
                </div>   
            </div>

            <div id="supplier_items" class="row mb-2">
                <div class="lds-dual-ring"></div>
                {*include file='./supplier_items.tpl' scope=parent*}
            </div>

            <div id="supplier_items_pag" class="row mt-5 mb-4">
                
            </div>

        </div>
        <div id="map" class="col-lg rounded-container">
            <div class="lds-dual-ring"></div>
        </div>

        {literal}
        <script>
            const C_GoogleAPIKey = '{/literal}{$GoogleAPIKey}{literal}';

            var mapSuppliersTotal = {/literal}{$supplier|json_encode nofilter}{literal};   
                    
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key={/literal}{$GoogleAPIKey}{literal}&callback=setOrderVar" defer></script>
        {/literal}

    </div>
</section>




