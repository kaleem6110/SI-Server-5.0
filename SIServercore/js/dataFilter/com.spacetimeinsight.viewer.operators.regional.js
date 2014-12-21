define(['siViewerNamespace','siViewerData','dataFilter/com.spacetimeinsight.viewer.operator'],function($si) {
	$si.Operators.regional['en'] = {
			equalTo: '=',
			like: 'like',
			inList: 'in [ ]',
			isNull: 'null',
			greaterThan : '>',
			lessThan : '<',
			greaterThanOrEqualTo : '>=',
			lessThanOrEqualTo : '<=',
			between :'< and >',
			betweenIncluding : '<= and >=',
			notEqualTo: 'not =',
			notLike: 'not like',
			notInList : 'not in [ ]',
			notNull : 'not null',
			notBetween : 'not < and >',
			notBetweenIncluding : 'not <= and >=',
	};

	$si.Operators.regional['fr'] = {
			equalTo: '=',
			like: 'comme',
			inList: 'in [ ]',
			isNull: 'null',
			notEqualTo: 'pas =',
			notLike: 'pas comme',
			notInList : 'pas dans [ ]',
			notNull : 'pas null˜',
			greaterThan : '>',
			lessThan : '<',
			greaterThanOrEqualTo : '>=',
			lessThanOrEqualTo : '<=',
			between :'< and >',
			betweenIncluding : '<= and >=',
			notBetween : 'not < and >',
			notBetweenIncluding : 'not <= and >=',
	};



	$si.Operators.setDefaults($si.Operators.regional[$si.viewer.locale]);
});

