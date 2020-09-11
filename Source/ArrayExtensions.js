
// extensions

function ArrayExtensions()
{
	// Extension class.
}

{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var item = this[i];
			var key = item[keyName];
			this[key] = item;
		}
		return this;
	}

	Array.prototype.clone = function()
	{
		var elementsCloned = [];
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var elementCloned = 
				(element.clone == null ? element : element.clone());
			elementsCloned.push(elementCloned);
		}
		return elementsCloned;
	}
}
