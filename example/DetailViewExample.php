<?php
if (!isset($TEMPLATE)) {
  $TITLE = 'DetailViewExample';
  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;
  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="css/index.css"/>
    <link rel="stylesheet" href="/lib/leaflet-0.7.7/leaflet.css"/>
  ';
  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/bundle.js"></script>
    <script src="/lib/leaflet-0.7.7/leaflet.js"></script>
    <script src="DetailViewExample.js"></script>
  ';
  include 'template.inc.php';
}
?>

<div class="detail-view-example"></div>
