class Video
  include Mongoid::Document
  include Mongoid::Timestamps

  field :id
  field :title
  field :content
  field :author

end
