import service from '@/utils/request'

// @Tags LotAudio
// @Summary 分页获取音频记录列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.LotAudioRecordSearch true "分页获取音频记录列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lot/audio/page [get]
export const getLotAudioRecords = (params) => {
  return service({
    url: '/lot/audio/page',
    method: 'get',
    params
  })
}
