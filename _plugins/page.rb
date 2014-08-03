module Jekyll
 
  # Extensions to the Jekyll Page class.
 
  class Page
 
    # Override initialize to also
    # parse the tags from the page
    # chain original call
 
    attr_accessor :tags
 
    alias orig_initialize initialize
    def initialize(site, base, dir, name)
      orig_initialize(site, base, dir, name)
      # Old version 
      # self.tags = self.data.pluralized_array("tag", "tags")
      self.tags = Utils.pluralized_array_from_hash(self.data, "tag", "tags")
    end
 
  end
end