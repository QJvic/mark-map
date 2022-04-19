/*!
 * maptalks.collisionLayer v0.2.2
 * LICENSE : MIT
 * (c) 2016-2018 maptalks.org
 */
/*!
 * requires maptalks@>=0.36.0
 */
import { MultiPoint, VectorLayer } from 'maptalks';
import rbush from 'rbush';

function _defaults(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);
    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : _defaults(subClass, superClass);
}

var options = {
  activeId: null,
  isCollision: true,
  isShowCollisionPoints: true,
  hidePointsId: 'hidePoints',
  hidePointsSymbol: {
    markerType: 'ellipse',
    markerFillOpacity: 0.3,
    markerLineOpacity: 0.3,
    markerWidth: 3,
    markerHeight: 3
  }
};

var CollisionLayer = (function (_maptalks$VectorLayer) {
  _inherits(CollisionLayer, _maptalks$VectorLayer);

  function CollisionLayer() {
    _classCallCheck(this, CollisionLayer);

    return _possibleConstructorReturn(
      this,
      _maptalks$VectorLayer.apply(this, arguments)
    );
  }

  CollisionLayer.prototype.onAdd = function onAdd() {
    this.map.on('viewchange', this.onViewChange, this);
    this._rbush = rbush();
    this._hidePoints = new MultiPoint([], {
      id: this.options.hidePointsId,
      symbol: this.options.hidePointsSymbol
    });
  };

  CollisionLayer.prototype.onViewChange = function onViewChange() {
    var _this2 = this;

    setTimeout(function () {
      return _this2.updateCollision();
    }, 0);
  };

  CollisionLayer.prototype.updateCollision = function updateCollision() {
    var _this3 = this;

    if (!this.options.isCollision) {
      return;
    }

    if (!this.getGeometryById(this.options.hidePointsId)) {
      this.addGeometry(this._hidePoints);
    }

    this._rbush.clear();

    var hidePoints = [],
      _options = this.options,
      activeId = _options.activeId,
      isShowCollisionPoints = _options.isShowCollisionPoints,
      activeGeometry = this.getGeometryById(activeId),
      markers = this.getMarkers();

    if (activeGeometry && activeGeometry.type === 'Point') {
      var box = this.getMarkerBox(activeGeometry);
      if (box) {
        this._rbush.insert(box);
      }
      activeGeometry.show();
    }

    markers.forEach(function (marker) {
      if (activeGeometry === marker) {
        return;
      }

      var box = _this3.getMarkerBox(marker);

      if (!box) {
        marker.show();
        return;
      }

      var result = _this3._rbush.search(box);

      if (result.length === 0) {
        _this3._rbush.insert(box);
        marker.show();
      } else {
        marker.hide();
        hidePoints.push(marker.getCoordinates());
      }
    });

    if (isShowCollisionPoints) {
      this._hidePoints.setCoordinates(hidePoints);
      this._hidePoints.bringToBack();
    } else {
      this._hidePoints.setCoordinates([]);
    }
  };

  CollisionLayer.prototype.getMarkerBox = function getMarkerBox(marker) {
    var size = marker.getSize();

    if (!size) {
      return;
    }

    var width = size.width,
      height = size.height,
      coordinates = marker.getCoordinates();

    if (!coordinates) {
      return;
    }

    var _map$coordinateToCont = this.map.coordinateToContainerPoint(
        marker.getCoordinates()
      ),
      x = _map$coordinateToCont.x,
      y = _map$coordinateToCont.y,
      minX = Math.round(x - width / 2),
      maxX = Math.round(x + width / 2),
      minY = Math.round(y - height / 2),
      maxY = Math.round(y + height / 2);

    return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
  };

  CollisionLayer.prototype.getMarkers = function getMarkers() {
    return this.getGeometries(function (geometry) {
      return geometry.type === 'Point' && geometry;
    });
  };

  CollisionLayer.prototype.isShowCollisionPoints =
    function isShowCollisionPoints() {
      return this.options.isShowCollisionPoints;
    };

  CollisionLayer.prototype.showCollisionPoints =
    function showCollisionPoints() {
      this.options.isShowCollisionPoints = true;
      this.updateCollision();
    };

  CollisionLayer.prototype.hideCollisionPoints =
    function hideCollisionPoints() {
      this.options.isShowCollisionPoints = false;
      this.updateCollision();
    };

  CollisionLayer.prototype.setActiveId = function setActiveId(id) {
    this.options.activeId = id;
    this.updateCollision();
  };

  CollisionLayer.prototype.enableCollision = function enableCollision() {
    this.options.isCollision = true;
    this.updateCollision();
  };

  CollisionLayer.prototype.disableCollision = function disableCollision() {
    this.options.isCollision = false;

    this._hidePoints.setCoordinates([]);
    var markers = this.getMarkers();
    markers.forEach(function (marker) {
      marker.show();
    });
  };

  CollisionLayer.prototype.isCollision = function isCollision() {
    return this.options.isCollision;
  };

  return CollisionLayer;
})(VectorLayer);

CollisionLayer.mergeOptions(options);

export { CollisionLayer };

typeof console !== 'undefined' &&
  console.log('maptalks.collisionLayer v0.2.2, requires maptalks@>=0.36.0.');
