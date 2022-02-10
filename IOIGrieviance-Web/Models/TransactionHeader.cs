using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Models
{
    public class TransactionHeader : ViewModelBase
    {
        public int id { get; set; }
        public string code { get; set; }
        public string code_location { get; set; }
        public string code_bussiness_unit { get; set; }
        public string fraud { get; set; } // fraud report at sks
        public string suspected { get; set; } // report cat
        public string map_coordinates { get; set; }
        public string id_device { get; set; }
        public string created_by { get; set; }
        public int? deleted_by { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime reporter_created_date { get; set; }
        public DateTime? deleted_date { get; set; }
        public int status { get; set; }
        public bool is_anonymous { get; set; }
        public bool is_deleted { get; set; }
        public string createTransDSTTDto { get; set; }
        public string hq_note_to_justificator { get; set; }
        public string user_dispatcher { get; set; }

        // not mapped
        public List<string> createTransDAttachmentDto { get; set; }
        public List<TrasactionRecipientModel> createTransDRecipientDto { get; set; }//
        public List<string> listRecipient { get; set; }
        public string location_name { get; set; }
        public string created_by_name { get; set; }
        public string bussiness_unit_name { get; set; }
        public string latest_status { get; set; }
        public int id_status { get; set; }
        public decimal total_processing_time { get; set; }
        public string update_by { get; set; }
        public DateTime? update_date { get; set; }
        public string hq_note_to_reporter { get; set; }
    }

    public class Timeline
    {
        public int id { get; set; }
        public string code { get; set; }
        public string id_status { get; set; }
    }

    public class TransactionHeaderDTO
    {
        public int id { get; set; }
        public string code { get; set; }
        public string code_location { get; set; }
        public string code_bussiness_unit { get; set; }
        public string fraud { get; set; } // fraud report at sks
        public string suspected { get; set; } // report cat
        public string map_coordinates { get; set; }
        public string id_device { get; set; }
        public string created_by { get; set; }
        public int? deleted_by { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? deleted_date { get; set; }
        public int status { get; set; }
        public bool is_anonymous { get; set; }
        public bool is_deleted { get; set; }
        public string createTransDSTTDto { get; set; }
        public string hq_note_to_justificator { get; set; }
        public string user_dispatcher { get; set; }
        public string language_code_stt { get; set; }

        // not mapped
        public List<string> createTransDAttachmentDto { get; set; }
        public List<string> createTransDRecipientDto { get; set; }
        public string location_name { get; set; }
        public string bussiness_unit_name { get; set; }
        public string latest_status { get; set; }
        public int id_status { get; set; }
        public decimal total_processing_time { get; set; }
        public string update_by { get; set; }
        public DateTime? update_date { get; set; }
    }

    public class SendToRecipientDTO
    {
        public string code_header { get; set; }
        public string dispatch_by { get; set; }
        public string hq_note_to_justificator { get; set; }
        public List<string> user_recipient { get; set; }
    }

    public class HQReportCloseDTO
    {
        public string code_header { get; set; }
        public string completed_by { get; set; }
        public bool is_approved { get; set; }
        public string hq_note_to_reporter { get; set; }
    }

    public class VoiceTransalateDTO
    {

        public string code_header_report { get; set; }
        public string code_header_speech { get; set; }
        public string speech_base64 { get; set; }
        public string language { get; set; }
        public string country { get; set; }
        public string code_language { get; set; }
    }

    public class STTResponseModel
    {
        public string code_header_speech { get; set; }
        public string code_language { get; set; }
        public string country { get; set; }
        public string language { get; set; }
        public string success { get; set; }
        public string text_transcript { get; set; }
        public string confidence { get; set; }
        public string message { get; set; }
    }

    public class TrasactionRecipientModel
    {
        public int id { get; set; }
        public string code_header { get; set; }
        public string user_dispatcher { get; set; }
        public string user_recipient { get; set; }
        public string hq_note_to_justificator { get; set; }
        public string justification_by { get; set; }
        public bool justification_status { get; set; }
        public DateTime? justification_date { get; set; }
        public bool is_send_email { get; set; }
    }

    public class TransactionAdminDTO
    {
        public string code_location { get; set; }
        public string code_bussiness_unit { get; set; }
        public string fraud { get; set; }
        public string suspected { get; set; }
        public string justification_request_from_administrator { get; set; }
        public string created_by { get; set; }
        public string language_code { get; set; }
        public List<string> createTransDAttachmentDto { get; set; }
        public string createTransDSTTDto { get; set; }
        public List<string> user_recipient { get; set; }
    }

}
