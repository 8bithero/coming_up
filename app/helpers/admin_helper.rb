module AdminHelper
	def counter_is_active?(item)
		if item.end_time != nil and Time.now <= item.end_time
			return true
		end
	end
end
