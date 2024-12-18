require "net/http"

class BoomService
  def self.fetch(params)
    url = URI(ENV["API_URL"] + "listings")
    url += "?#{params.to_query}"

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{get_auth_headers}"

    response = https.request(request)
    response.read_body
  end

  def self.get_auth_headers
    uri = URI(ENV["API_URL"] + "auth/token")
    body = { client_id:  ENV["CLIENT_ID"], client_secret: ENV["CLIENT_SECRET"] }
    r = Net::HTTP.post(uri, body.to_json)

    { "Authorization": "Bearer " + JSON.parse(r.body)["access_token"] }
  end
end
