class Photo
  include Mongoid::Document
  include Mongoid::MultiParameterAttributes
  include Mongoid::Paperclip
  include Mongoid::Timestamps
  
  field :status
  field :fromc , type: Boolean
  has_mongoid_attached_file :file,
    :styles => {
            :medium => ["500x320>",:jpeg]
    },
    # Amazon S3
    :storage => :s3,
    :bucket => 'habbademobucket',
    :s3_credentials => {
                       :access_key_id => ENV['S3_KEY'] || 'AKIAIW6XIV4S2H47ECJA',
                       :secret_access_key => ENV['S3_SECRET'] || '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',
                       }
  
end
