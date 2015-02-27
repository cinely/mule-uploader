class MuleController < ApplicationController


    AWS_ACCESS_KEY = 'AWS_ACCESS_KEY'
    AWS_SECRET = 'AWS_SECRET_KEY'
    BUCKET = 'YOUR_BUCKET'
  
    AWS_REGION = 'us-east-1'
    MIME_TYPE = 'application/octet-stream'
    CHUNK_SIZE = 6 * 1024 * 1024  # 6MB


    def signing_key 
        
        date = Time.now

        key = get_signature(date)


        data = {
            date: date.utc.iso8601,
            signature: key,
            access_key: AWS_ACCESS_KEY,
            region: AWS_REGION,
            bucket: BUCKET,
            backup_key: 1000,
            content_type: MIME_TYPE,
        }

        render json: data
        
    end



 
    def chunk_loaded
    
        key = params[:key]
        upload_id = params[:upload_id]
        chunk = params[:chunk]
        
        
        filename = params[:filename]
        filesize = params[:filesize].to_i
        last_modified = params[:last_modified]
        chunk = params[:chunk].to_i
      
        if filesize > CHUNK_SIZE
          
                
               upload = Upload.where(filename: filename)
                                .and(filesize: filesize)
                                .and(last_modified: last_modified).first
                  
                
               
               if upload

                   upload.chunks_uploaded << chunk
                   upload.chunks_uploaded = upload.chunks_uploaded.uniq
                   upload.save
                 
               else
               
      
              
                  upload = Upload.create( filename: filename,
                                          filesize: filesize,
                                          last_modified: last_modified, 
                                          chunks_uploaded: [chunk], 
                                          key: key, 
                                          upload_id: upload_id)
                                         
               end
      
          end
          
          
         render json: {}
     
    end
 





private



     def bin_to_hex(s)

       s.unpack('H*')[0]

     end


     def sign(key, msg)

         sha256 = OpenSSL::Digest::Digest.new('sha256')
         hmac =  OpenSSL::HMAC.digest(sha256, key, msg.encode("utf-8"))
         hmac

     end


     def get_signature_key(key, date_stamp, region_name, service_name)
         k_date = sign(("AWS4" + key).encode("utf-8"), date_stamp)
         k_region = sign(k_date, region_name)
         k_service = sign(k_region, service_name)
         k_signing = sign(k_service, "aws4_request")
         k_signing
         
     end


     def get_signature(date)

         sig_key = get_signature_key(AWS_SECRET, date.utc.strftime("%Y%m%d"), AWS_REGION, "s3")
         result = bin_to_hex(sig_key)
         result

     end



end